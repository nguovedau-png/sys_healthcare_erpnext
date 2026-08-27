import frappe
import random
import string
import os, sys
from frappe.utils import nowdate

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_value_for_field(field, master_data):
    if field.fieldtype == 'Link' and field.options in master_data:
        return master_data[field.options]
    elif field.fieldtype == 'Link':
        existing = frappe.db.get_value(field.options, {}, 'name')
        return existing
    elif field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    elif field.fieldtype in ['Date', 'Datetime']:
        return nowdate()
    elif field.fieldtype == 'Check':
        return random.choice([0, 1])
    elif field.fieldtype in ['Data', 'Text', 'Long Text', 'Small Text']:
        return f"Seed {field.label} {random_string(5)}"
    elif field.fieldtype == 'Select':
        options = (field.options or '').split('\n')
        options = [o.strip() for o in options if o.strip()]
        return random.choice(options) if options else ""
    return None

def run_seed():
    print("Step 1: Master Data...")
    master_data = {}
    
    # 1. Tenant
    tenant_name = 'Test Tenant'
    if not frappe.db.exists('Hc Tenant', tenant_name):
        try:
            doc = frappe.new_doc('Hc Tenant')
            doc.update({
                'name_custom': tenant_name,
                'status': 'Active',
                'email': 'tenant@test.local'
            })
            doc.db_insert()
            print("  Created Hc Tenant")
        except Exception as e:
            print(f"  Failed Hc Tenant: {e}")
    master_data['Hc Tenant'] = tenant_name

    # 2. Branch
    branch_name = 'Test Branch'
    if not frappe.db.exists('Hc Branch', branch_name):
        try:
            # We use db_insert to bypass controller if it's broken
            doc = frappe.new_doc('Hc Branch')
            doc.update({
                'name_custom': branch_name,
                'branchname': branch_name,
                'tenant': tenant_name,
                'status': 'Active'
            })
            doc.db_insert()
            print("  Created Hc Branch")
        except Exception as e:
            print(f"  Failed Hc Branch: {e}")
    master_data['Hc Branch'] = branch_name
    
    # 3. User
    user_name = 'Test User'
    if not frappe.db.exists('Hc User', user_name):
        try:
            doc = frappe.new_doc('Hc User')
            doc.update({
                'name_custom': user_name,
                'username': 'seeder',
                'fullname': 'Seed User',
                'tenant': tenant_name,
                'status': 'Active'
            })
            doc.db_insert()
            print("  Created Hc User")
        except Exception as e:
            print(f"  Failed Hc User: {e}")
    master_data['Hc User'] = user_name

    print("Step 2: Transactional Data...")
    doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0, 'issingle': 0}, fields=['name'])
    
    total = 0
    for i, dt_row in enumerate(doctypes):
        dt = dt_row.name
        if dt in ['Hc Tenant', 'Hc Branch', 'Hc User']: continue
        
        count = frappe.db.count(dt)
        if count >= 100:
            print(f"  [{i+1}/{len(doctypes)}] Skipping {dt} ({count} records)")
            continue
            
        print(f"  [{i+1}/{len(doctypes)}] Seeding {dt}...")
        meta = frappe.get_meta(dt)
        
        success = 0
        for _ in range(100 - count):
            try:
                # Use db_insert to skip complex controller logic that might require specific setup
                doc = frappe.new_doc(dt)
                for f in meta.fields:
                    if f.reqd:
                        val = get_value_for_field(f, master_data)
                        if val: doc.set(f.fieldname, val)
                
                # Auto-set identifiers if mandatory
                if hasattr(doc, 'tenant') and not doc.tenant: doc.tenant = tenant_name
                if hasattr(doc, 'branch') and not doc.branch: doc.branch = branch_name
                if hasattr(doc, 'customer') and not doc.customer: doc.customer = user_name
                if 'status' in [f.fieldname for f in meta.fields] and not doc.status:
                    doc.status = 'Open'
                
                doc.db_insert()
                success += 1
                total += 1
            except Exception:
                pass
        
        if success > 0:
            print(f"    Inserted {success} records")
            frappe.db.commit()
            
    print(f"Total transactional records inserted: {total}")

if __name__ == '__main__':
    run_seed()
