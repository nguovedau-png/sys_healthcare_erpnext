import os, sys, random, string
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe
from frappe.utils import nowdate, flt

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_value_for_field(field, master_data):
    if field.fieldtype == 'Link' and field.options in master_data:
        return master_data[field.options]
    elif field.fieldtype == 'Link':
        # Try to find an existing record or return None
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
        return random.choice(options) if options else None
    return None

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    print("Step 1: Ensuring Master Data...")
    # 1. Tenant
    if not frappe.db.exists('Hc Tenant', 'Test Tenant'):
        tenant = frappe.get_doc({
            'doctype': 'Hc Tenant',
            'tenantname': 'Test Tenant',
            'name': 'Test Tenant'
        }).insert(ignore_permissions=True)
    
    # 2. Branch
    if not frappe.db.exists('Hc Branch', 'Test Branch'):
        branch = frappe.get_doc({
            'doctype': 'Hc Branch',
            'branchname': 'Test Branch',
            'name': 'Test Branch',
            'tenant': 'Test Tenant'
        }).insert(ignore_permissions=True)
        
    # 3. User
    if not frappe.db.exists('Hc User', 'Test User'):
        user = frappe.get_doc({
            'doctype': 'Hc User',
            'username': 'Test User',
            'name': 'Test User',
            'fullname': 'Test Seeding User',
            'tenant': 'Test Tenant'
        }).insert(ignore_permissions=True)
        
    master_data = {
        'Hc Tenant': 'Test Tenant',
        'Hc Branch': 'Test Branch',
        'Hc User': 'Test User'
    }
    
    print("Step 2: Scoping DocTypes...")
    booking_doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0}, fields=['name'])
    print(f"Total DocTypes to seed: {len(booking_doctypes)}")
    
    for i, dt_row in enumerate(booking_doctypes):
        dt_name = dt_row.name
        print(f"[{i+1}/{len(booking_doctypes)}] Seeding '{dt_name}'...")
        
        # Skip if it has a lot of records already
        if frappe.db.count(dt_name) >= 100:
            print(f"  Skipping '{dt_name}' (already has 100+ records)")
            continue
            
        meta = frappe.get_meta(dt_name)
        
        for j in range(100):
            try:
                doc_dict = {'doctype': dt_name}
                for field in meta.fields:
                    if field.reqd or random.random() > 0.5:
                        val = get_value_for_field(field, master_data)
                        if val is not None:
                            doc_dict[field.fieldname] = val
                
                # Special cases for fields that often cause naming issues
                if 'branchid' in doc_dict and not doc_dict['branchid']:
                    doc_dict['branchid'] = 'Test Branch'
                if 'customerid' in doc_dict and not doc_dict['customerid']:
                    doc_dict['customerid'] = 'Test User'
                
                frappe.get_doc(doc_dict).insert(ignore_permissions=True)
            except Exception as e:
                # Silently skip errors for complex types or missing links
                pass
        
        if (i + 1) % 5 == 0:
            frappe.db.commit()
            print(f"  Committed batch {i+1}")
            
    frappe.db.commit()
    print("Step 3: Seeding complete.")

if __name__ == '__main__':
    run()
