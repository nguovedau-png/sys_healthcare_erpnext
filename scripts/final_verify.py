import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/booking')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # 1. Check DocType meta for Hc Order
    try:
        meta = frappe.get_meta('Hc Order')
        print(f"DocType 'Hc Order' metadata loaded. Module: {meta.module}")
    except Exception as e:
        print(f"ERROR: DocType 'Hc Order' meta load failed: {e}")
        
    # 2. Check counts for a few Hc Doctypes
    from frappe.desk.reportview import get_count
    # Manually populate form_dict for get_count
    for dt in ['Hc Order', 'Hc Patient', 'Hc Staff Member']:
        if frappe.db.exists('DocType', dt):
            frappe.local.form_dict = frappe._dict({'doctype': dt})
            count = get_count()
            print(f"Count for {dt}: {count}")
            
    # 3. Check Workspace shortcuts
    sh = frappe.db.get_all('Workspace Shortcut', filters={'parent': 'Booking'}, limit=5)
    print(f"Booking Workspace Shortcuts sample: {sh}")

if __name__ == '__main__':
    run()
