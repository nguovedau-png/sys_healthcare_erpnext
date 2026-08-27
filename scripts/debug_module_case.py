import os, sys, logging

# Fix logging path issue
log_dir = 'healthcare.local/logs'
if not os.path.exists(log_dir):
    os.makedirs(log_dir, exist_ok=True)

# Add apps to sys.path
cwd = os.getcwd()
sys.path.extend([
    os.path.join(cwd, 'apps/frappe'),
    os.path.join(cwd, 'apps/erpnext'),
    os.path.join(cwd, 'apps/booking')
])

import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dt = 'Hc Order'
    module = frappe.db.get_value('DocType', dt, 'module')
    print(f"DocType: {dt}, Module Name in DB: '{module}'")
    
    # Check if 'booking' subfolder exists
    app_pkg_path = os.path.join(os.getcwd(), 'apps/booking/booking')
    subfolders = [f for f in os.listdir(app_pkg_path) if os.path.isdir(os.path.join(app_pkg_path, f))]
    print(f"Subfolders in {app_pkg_path}: {subfolders}")
    
    # Test path resolution for this module
    from frappe.modules import get_module_path
    try:
        m_path = get_module_path(module)
        print(f"Path for module '{module}': {m_path}")
    except Exception as e:
        print(f"Error get_module_path: {e}")

if __name__ == '__main__':
    run()
