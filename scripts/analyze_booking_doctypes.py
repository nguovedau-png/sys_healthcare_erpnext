import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    booking_doctypes = frappe.get_all('DocType', filters={'module': 'booking'}, fields=['name'])
    print(f"Found {len(booking_doctypes)} DocTypes in 'booking' module.")
    
    for dt in booking_doctypes[:10]: # Check first 10
        meta = frappe.get_meta(dt.name)
        mandatory_fields = [f.fieldname for f in meta.fields if f.reqd]
        links = [(f.fieldname, f.options) for f in meta.fields if f.fieldtype == 'Link']
        print(f"DocType: {dt.name}")
        print(f"  Mandatory: {mandatory_fields}")
        print(f"  Links: {links}")

if __name__ == '__main__':
    run()
