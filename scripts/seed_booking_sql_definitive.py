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
    if field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    if field.fieldtype in ['Date']: return nowdate()
    if field.fieldtype in ['Datetime']: return now_datetime()
    if field.fieldtype in ['Check']: return random.choice([0, 1])
    if field.fieldtype in ['Data', 'Text']: return f"T-{random_string(5)}"
    return None

def run_seed():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    tenant_name = 'TEST-TENANT-1'
    branch_name = 'TEST-BRANCH-1'
    user_name = '1'
    
    master_data = {
        'Hc Tenant': tenant_name,
        'Hc Branch': branch_name,
        'Hc User': user_name
    }
    
    print("Step 1: Master Data (Definitive)...")
    
    # 1. Tenant
    if not frappe.db.exists('Hc Tenant', tenant_name):
        frappe.db.sql("INSERT INTO `tabHc Tenant` (name, name_custom, status, email, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                    (tenant_name, tenant_name, 'Active', 'tenant@test.local'))
    
    # 2. Branch
    if not frappe.db.exists('Hc Branch', branch_name):
        frappe.db.sql("INSERT INTO `tabHc Branch` (name, name_custom, tenant, status, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                    (branch_name, branch_name, tenant_name, 'Active'))
                    
    # 3. User
    if not frappe.db.count('Hc User'):
        # Check column type
        c_type = frappe.db.get_column_type('Hc User', 'name')
        if 'int' in c_type.lower():
            frappe.db.sql("INSERT INTO `tabHc User` (name, email, status, tenant, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                        (1, 'seed@test.local', 'Active', tenant_name))
            master_data['Hc User'] = '1'
        else:
            frappe.db.sql("INSERT INTO `tabHc User` (name, email, status, tenant, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                        ('SEED-USER-1', 'seed@test.local', 'Active', tenant_name))
            master_data['Hc User'] = 'SEED-USER-1'

    frappe.db.commit()

    print("Step 2: Transactional Data...")
    doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0, 'issingle': 0}, fields=['name'])
    
    total = 0
    for dt_row in doctypes:
        dt = dt_row.name
        if dt in ['Hc Tenant', 'Hc Branch', 'Hc User']: continue
        
        count = frappe.db.count(dt)
        if count >= 100:
            print(f"  [{dt}] Skipping (count={count})")
            continue
            
        print(f"  [{dt}] Seeding...")
        c_type = frappe.db.get_column_type(dt, 'name')
        is_int = 'int' in c_type.lower()
        
        meta = frappe.get_meta(dt)
        table = f"tab{dt}"
        valid_cols = frappe.db.get_table_columns(dt)
        
        success = 0
        for i in range(100 - count):
            try:
                # Name
                if is_int:
                    name = i + 2 # avoid 0/1
                else:
                    name = f"S-{dt[3:7]}-{i}-{random_string(4)}"
                
                cols = ['name', 'creation', 'modified', 'owner', 'modified_by', 'docstatus']
                vals = [name, nowdate(), nowdate(), 'Administrator', 'Administrator', 0]
                
                for f in meta.fields:
                    if (f.reqd or random.random() > 0.4) and f.fieldname in valid_cols:
                        val = get_db_value(f, master_data)
                        if val is not None:
                            cols.append(f.fieldname); vals.append(val)
                
                # Links
                if 'tenant' in valid_cols and 'tenant' not in cols:
                    cols.append('tenant'); vals.append(tenant_name)
                if 'branch' in valid_cols and 'branch' not in cols:
                    cols.append('branch'); vals.append(branch_name)
                if 'customer' in valid_cols and 'customer' not in cols:
                    cols.append('customer'); vals.append(master_data['Hc User'])

                col_str = ", ".join([f"`{c}`" for c in cols])
                placeholders = ", ".join(["%s"] * len(vals))
                frappe.db.sql(f"INSERT INTO `{table}` ({col_str}) VALUES ({placeholders})", tuple(vals))
                success += 1
                total += 1
            except Exception: pass
        
        if success > 0:
            print(f"    Inserted {success} records")
            frappe.db.commit()
            
    print(f"Step 3: DONE. Total records inserted: {total}")

if __name__ == '__main__':
    run_seed()
