import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/booking')])
import frappe
from frappe.modules.import_file import import_file_by_path

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    path = os.path.abspath('apps/booking/booking/doctype/hc_order/hc_order.json')
    print(f"Importing from path: {path}")
    if os.path.exists(path):
        try:
            import_file_by_path(path, force=True)
            frappe.db.commit()
            print("Import successful.")
            if frappe.db.exists('DocType', 'Hc Order'):
                print("Hc Order now exists in DB!")
            else:
                print("Hc Order STILL MISSING in DB after import.")
        except Exception as e:
            print(f"Error during import: {e}")
    else:
        print("Path does not exist.")

if __name__ == '__main__':
    run()
