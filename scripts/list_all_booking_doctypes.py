import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # List all DocTypes that belong to the 'booking' module
    dts = frappe.get_all('DocType', filters={'module': 'booking'}, fields=['name'])
    print(f"DocTypes in 'booking' module:")
    for d in sorted([d.name for d in dts]):
        print(f"  - {d}")

if __name__ == '__main__':
    run()
