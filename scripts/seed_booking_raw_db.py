import frappe
import random
import string
import os, sys
from frappe.utils import nowdate, now_datetime

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_db_value(field, master_data):
    if field.fieldtype == 'Link' and field.options in master_data:
        return master_data[field.options]
    elif field.fieldtype == 'Link':
        # Try to find an existing record in the DB
        existing = frappe.db.get_value(field.options, {}, 'name')
        return existing
    elif field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    elif field.fieldtype in ['Date']:
        return nowdate()
    elif field.fieldtype in ['Datetime']:
        return now_datetime()
    elif field.fieldtype == 'Check':
        return random.choice([0, 1])
    elif field.fieldtype in ['Data', 'Text', 'Long Text', 'Small Text']:
        return f"RawSeed {field.label} {random_string(5)}"
    elif field.fieldtype == 'Select':
        options = (field.options or '').split('\n')
        options = [o.strip() for o in options if o.strip()]
        return random.choice(options) if options else ""
    return None

def run_seed():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    print("Step 1: Master Data (SQL Bypass)...")
    master_data = {}
    
    # 1. Tenant
    tenant_name = 'Test Tenant'
    if not frappe.db.exists('Hc Tenant', tenant_name):
        try:
            frappe.db.sql("""INSERT INTO `tabHc Tenant` (name, name_custom, status, email, creation, modified, modified_by, owner, docstatus)
                           VALUES (%s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator', 0)""",
                        (tenant_name, tenant_name, 'Active', 'tenant@test.local'))
            print("  Inserted Hc Tenant SQL")
        except Exception as e:
            print(f"  Fail Hc Tenant SQL: {e}")
    master_data['Hc Tenant'] = tenant_name

    # 2. Branch
    branch_name = 'Test Branch'
    if not frappe.db.exists('Hc Branch', branch_name):
        try:
            frappe.db.sql("""INSERT INTO `tabHc Branch` (name, name_custom, branchname, tenant, status, creation, modified, modified_by, owner, docstatus)
                           VALUES (%s, %s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator', 0)""",
                        (branch_name, branch_name, branch_name, tenant_name, 'Active'))
            print("  Inserted Hc Branch SQL")
        except Exception as e:
            print(f"  Fail Hc Branch SQL: {e}")
    master_data['Hc Branch'] = branch_name
    
    # 3. User
    user_name = 'Test User'
    if not frappe.db.exists('Hc User', user_name):
        try:
            frappe.db.sql("""INSERT INTO `tabHc User` (name, name_custom, username, fullname, tenant, status, creation, modified, modified_by, owner, docstatus)
                           VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW(), 'Administrator', 'Administrator', 0)""",
                        (user_name, user_name, 'seeder', 'Seed User', tenant_name, 'Active'))
            print("  Inserted Hc User SQL")
        except Exception as e:
            print(f"  Fail Hc User SQL: {e}")
    master_data['Hc User'] = user_name

    print("Step 2: Transactional Data (SQL Bypass)...")
    doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0, 'issingle': 0}, fields=['name'])
    
    total = 0
    for i, dt_row in enumerate(doctypes):
        dt = dt_row.name
        if dt in ['Hc Tenant', 'Hc Branch', 'Hc User']: continue
        
        count = frappe.db.count(dt)
        if count >= 100:
            print(f"  [{i+1}/{len(doctypes)}] Skipping {dt} ({count} records)")
            continue
            
        print(f"  [{i+1}/{len(doctypes)}] Seeding {dt} via SQL...")
        table = f"tab{dt}"
        meta = frappe.get_meta(dt)
        
        # Get standard columns
        standard_cols = ['name', 'creation', 'modified', 'modified_by', 'owner', 'docstatus']
        
        success = 0
        for j in range(100 - count):
            try:
                # Generate unique name
                doc_name = f"SEED-{dt}-{random_string(8)}"
                
                cols = standard_cols.copy()
                vals = [doc_name, nowdate(), nowdate(), 'Administrator', 'Administrator', 0]
                
                for f in meta.fields:
                    if f.reqd or random.random() > 0.5:
                        val = get_db_value(f, master_data)
                        if val is not None:
                            cols.append(f.fieldname)
                            vals.append(val)
                
                # Sanity for common link fields
                if 'tenant' in [f.fieldname for f in meta.fields] and 'tenant' not in cols:
                    cols.append('tenant')
                    vals.append(tenant_name)
                if 'branch' in [f.fieldname for f in meta.fields] and 'branch' not in cols:
                    cols.append('branch')
                    vals.append(branch_name)
                
                placeholders = ", ".join(["%s"] * len(vals))
                col_names = ", ".join([f"`{c}`" for c in cols])
                
                frappe.db.sql(f"INSERT INTO `{table}` ({col_names}) VALUES ({placeholders})", tuple(vals))
                success += 1
                total += 1
            except Exception:
                pass
        
        if success > 0:
            print(f"    Inserted {success} records into {table}")
            frappe.db.commit()
            
    print(f"Total transactional records inserted via SQL: {total}")

if __name__ == '__main__':
    run_seed()
