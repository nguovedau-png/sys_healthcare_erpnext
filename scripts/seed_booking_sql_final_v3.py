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
    if field.fieldtype in ['Check']: return random.choice([0, 1])
    if field.fieldtype in ['Data', 'Text']: return f"S-{random_string(5)}"
    return None

def run_seed():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    tenant_name = 'Test Tenant'
    branch_name = 'Test Branch'
    user_name = '1' # Because name is bigint autoincrement
    email = 'seed_user@test.local'
    
    master_data = {
        'Hc Tenant': tenant_name,
        'Hc Branch': branch_name,
        'Hc User': user_name
    }
    
    print("Step 1: Master Data (Finalized Paths)...")
    
    # 1. Tenant
    if not frappe.db.exists('Hc Tenant', tenant_name):
        frappe.db.sql("INSERT INTO `tabHc Tenant` (name, name_custom, status, email, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                    (tenant_name, tenant_name, 'Active', 'tenant@test.local'))
    
    # 2. Branch
    if not frappe.db.exists('Hc Branch', branch_name):
        frappe.db.sql("INSERT INTO `tabHc Branch` (name, name_custom, tenant, status, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                    (branch_name, branch_name, tenant_name, 'Active'))
                    
    # 3. User Phone (Required by Hc User)
    phone_name = '123456789'
    if not frappe.db.exists('Hc User Phone', phone_name):
        # We need to know Hc User Phone schema. Assuming default name as key.
        try:
            frappe.db.sql("INSERT INTO `tabHc User Phone` (name, phone, creation, modified) VALUES (%s, %s, NOW(), NOW())", (phone_name, phone_name))
        except: pass

    # 4. User
    if not frappe.db.count('Hc User'):
        try:
            frappe.db.sql("INSERT INTO `tabHc User` (email, status, phone, tenant, creation, modified) VALUES (%s, %s, %s, %s, NOW(), NOW())",
                        (email, 'Active', phone_name, tenant_name))
            new_id = frappe.db.sql("SELECT last_insert_id()")[0][0]
            master_data['Hc User'] = str(new_id)
            print(f"  Inserted Hc User with ID {new_id}")
        except Exception as e: print(f"  Fail User: {e}")
    else:
        master_data['Hc User'] = str(frappe.db.get_value('Hc User', {}, 'name'))

    frappe.db.commit()

    print("Step 2: Transactional Data...")
    doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0, 'issingle': 0}, fields=['name'])
    
    total = 0
    for dt_row in doctypes:
        dt = dt_row.name
        if dt in ['Hc Tenant', 'Hc Branch', 'Hc User', 'Hc User Phone']: continue
        
        count = frappe.db.count(dt)
        if count >= 100: continue
            
        print(f"  Seeding {dt}...")
        meta = frappe.get_meta(dt)
        table = f"tab{dt}"
        valid_cols = frappe.db.get_table_columns(dt)
        
        success = 0
        for _ in range(100 - count):
            try:
                # Determine Name
                autoname = meta.autoname or ""
                cols = ['creation', 'modified', 'owner', 'modified_by', 'docstatus']
                vals = [nowdate(), nowdate(), 'Administrator', 'Administrator', 0]
                
                if 'autoincrement' not in autoname.lower():
                    name = f"S-{dt[3:7]}-{random_string(6)}"
                    cols.append('name'); vals.append(name)
                
                for f in meta.fields:
                    if (f.reqd or random.random() > 0.5) and f.fieldname in valid_cols:
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
            print(f"    + {success} records")
            frappe.db.commit()
            
    print(f"Step 3: Seeding complete. Total: {total}")

if __name__ == '__main__':
    run_seed()
