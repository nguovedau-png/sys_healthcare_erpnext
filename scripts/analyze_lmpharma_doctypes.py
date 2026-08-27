import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dts = frappe.get_all('DocType', filters={'module': 'lmpharma'})
    print(f"Analyzing {len(dts)} DocTypes in 'lmpharma'...")
    
    for d in dts:
        meta = frappe.get_meta(d.name)
        if meta.istable:
            print(f"  [Table] {d.name} (Skipping)")
            continue
            
        c_type = frappe.db.get_column_type(d.name, 'name')
        count = frappe.db.count(d.name)
        print(f"  [DocType] {d.name} | Type: {c_type} | Count: {count}")

if __name__ == '__main__':
    run()
