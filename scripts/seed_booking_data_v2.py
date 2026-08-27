import os, sys, random, string
cwd = os.getcwd()
# Add all app paths to sys.path
sys.path.extend([
    os.path.join(cwd, 'apps/frappe'),
    os.path.join(cwd, 'apps/erpnext'),
    os.path.join(cwd, 'apps/booking')
])
import frappe
from frappe.utils import nowdate

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_value_for_field(field, master_data):
    if field.fieldtype == 'Link' and field.options in master_data:
        return master_data[field.options]
    elif field.fieldtype == 'Link':
        # Try to find a recently created or existing record
        existing = frappe.db.get_value(field.options, {}, 'name')
        return existing
    elif field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    elif field.fieldtype in ['Date', 'Datetime']:
        return nowdate()
    elif field.fieldtype == 'Check':
        return random.choice([0, 1])
    elif field.fieldtype in ['Data', 'Text', 'Long Text', 'Small Text']:
        return f"Test {field.label} {random_string(5)}"
    elif field.fieldtype == 'Select':
        options = (field.options or '').split('\n')
        return random.choice(options) if options else ""
    return None

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    print("Step 1: Ensuring Master Data...")
    master_data = {}
    
    # 1. Tenant
    if not frappe.db.exists('Hc Tenant', 'Test Tenant'):
        try:
            tenant = frappe.get_doc({
                'doctype': 'Hc Tenant',
                'tenantname': 'Test Tenant',
                'name': 'Test Tenant'
            }).insert(ignore_permissions=True)
            print("  Created Hc Tenant: Test Tenant")
        except Exception as e:
            print(f"  Error creating Hc Tenant: {e}")
    master_data['Hc Tenant'] = 'Test Tenant'
    
    # 2. Branch
    if not frappe.db.exists('Hc Branch', 'Test Branch'):
        try:
            branch = frappe.get_doc({
                'doctype': 'Hc Branch',
                'branchname': 'Test Branch',
                'name': 'Test Branch',
                'tenant': 'Test Tenant'
            }).insert(ignore_permissions=True)
            print("  Created Hc Branch: Test Branch")
        except Exception as e:
            print(f"  Error creating Hc Branch: {e}")
    master_data['Hc Branch'] = 'Test Branch'
        
    # 3. User
    if not frappe.db.exists('Hc User', 'Test User'):
        try:
            user = frappe.get_doc({
                'doctype': 'Hc User',
                'username': 'Test User',
                'name': 'Test User',
                'fullname': 'Test Seeding User',
                'tenant': 'Test Tenant'
            }).insert(ignore_permissions=True)
            print("  Created Hc User: Test User")
        except Exception as e:
            print(f"  Error creating Hc User: {e}")
    master_data['Hc User'] = 'Test User'
    
    print("Step 2: Scoping DocTypes...")
    booking_doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0}, fields=['name'])
    print(f"Total DocTypes to seed: {len(booking_doctypes)}")
    
    total_inserted = 0
    for i, dt_row in enumerate(booking_doctypes):
        dt_name = dt_row.name
        
        # Don't seed the master data again
        if dt_name in master_data:
            continue
            
        # Check current count
        current_count = frappe.db.count(dt_name)
        if current_count >= 100:
            print(f"[{i+1}/{len(booking_doctypes)}] Skipping '{dt_name}' (already has {current_count} records)")
            continue
            
        print(f"[{i+1}/{len(booking_doctypes)}] Seeding '{dt_name}'...")
        meta = frappe.get_meta(dt_name)
        
        count_in_dt = 0
        target = 100 - current_count
        for j in range(target):
            try:
                doc_dict = {'doctype': dt_name}
                for field in meta.fields:
                    if field.reqd or random.random() > 0.4:
                        val = get_value_for_field(field, master_data)
                        if val is not None:
                            doc_dict[field.fieldname] = val
                
                # Naming sanity for specific common fields in this app
                if 'branchid' in doc_dict and not doc_dict['branchid']:
                    doc_dict['branchid'] = 'Test Branch'
                if 'customerid' in doc_dict and not doc_dict['customerid']:
                    doc_dict['customerid'] = 'Test User'
                
                frappe.get_doc(doc_dict).insert(ignore_permissions=True)
                count_in_dt += 1
                total_inserted += 1
            except Exception:
                pass
        
        print(f"  Inserted {count_in_dt} records.")
        if (i + 1) % 5 == 0:
            frappe.db.commit()
            
    frappe.db.commit()
    frappe.clear_cache()
    print(f"Step 3: Seeding complete. Total records inserted: {total_inserted}")

if __name__ == '__main__':
    run()
