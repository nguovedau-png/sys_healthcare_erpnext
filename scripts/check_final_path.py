import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/booking')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dt = 'Hc Order'
    if frappe.db.exists('DocType', dt):
        module = frappe.db.get_value('DocType', dt, 'module')
        print(f"DocType: {dt}, Module: {module}")
        
        from frappe.modules import get_module_path, scrub
        try:
            m_path = get_module_path(module)
            print(f"Module Path: {m_path}")
            d_path = os.path.join(m_path, 'doctype', scrub(dt), scrub(dt) + '.json')
            print(f"Expected JSON Path: {d_path}")
            print(f"Exists: {os.path.exists(d_path)}")
        except Exception as e:
            print(f"Error resolving path: {e}")
    else:
        print(f"DocType {dt} does not exist in DB.")

if __name__ == '__main__':
    run()
