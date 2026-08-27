import frappe
import random
import string
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
    
    # Simple list of Master DocTypes to ensure exist
    masters = [
        ('Hc Tenant', {'tenantname': 'Test Tenant', 'name': 'Test Tenant'}),
        ('Hc Branch', {'branchname': 'Test Branch', 'name': 'Test Branch', 'tenant': 'Test Tenant'}),
        ('Hc User', {'username': 'test_seeder', 'name': 'Test User', 'fullname': 'Seed User', 'tenant': 'Test Tenant'})
    ]
    
    for dt, data in masters:
        if not frappe.db.exists(dt, data['name']):
            try:
                frappe.get_doc({'doctype': dt, **data}).insert(ignore_permissions=True)
                print(f"  Created {dt}")
            except Exception as e:
                print(f"  Failed {dt}: {e}")
        master_data[dt] = data['name']

    print("Step 2: Transactional Data...")
    doctypes = frappe.get_all('DocType', filters={'module': 'booking', 'istable': 0, 'issingle': 0}, fields=['name'])
    
    total = 0
    for i, dt_row in enumerate(doctypes):
        dt = dt_row.name
        if dt in master_data: continue
        
        count = frappe.db.count(dt)
        if count >= 100:
            print(f"  [{i+1}/{len(doctypes)}] Skipping {dt} ({count} records)")
            continue
            
        print(f"  [{i+1}/{len(doctypes)}] Seeding {dt}...")
        meta = frappe.get_meta(dt)
        
        success = 0
        for _ in range(100 - count):
            try:
                doc = frappe.new_doc(dt)
                for f in meta.fields:
                    if f.reqd:
                        val = get_value_for_field(f, master_data)
                        if val: doc.set(f.fieldname, val)
                
                # Sanity for common link fields if not set
                if hasattr(doc, 'tenant') and not doc.tenant: doc.tenant = 'Test Tenant'
                if hasattr(doc, 'branch') and not doc.branch: doc.branch = 'Test Branch'
                if hasattr(doc, 'customer') and not doc.customer: doc.customer = 'Test User'
                
                doc.insert(ignore_permissions=True)
                success += 1
                total += 1
            except Exception:
                pass
        
        if success > 0:
            print(f"    Inserted {success} records")
            frappe.db.commit()
            
    print(f"Total records inserted: {total}")

if __name__ == '__main__':
    run_seed()
