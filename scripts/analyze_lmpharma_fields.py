import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dts = frappe.get_all('DocType', filters={'module': 'lmpharma', 'istable': 0})
    for d in dts:
        meta = frappe.get_meta(d.name)
        mandatory_links = [f.fieldname for f in meta.fields if f.reqd and f.fieldtype == 'Link']
        if mandatory_links:
            print(f"DocType: {d.name} | Mandatory Links: {mandatory_links}")

if __name__ == '__main__':
    run()
