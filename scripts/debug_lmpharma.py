import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    print(f"Installed Apps: {frappe.get_installed_apps()}")
    
    # List all DocTypes in lmpharma module
    doctypes = frappe.db.get_all('DocType', filters={'module': 'lmpharma'}, pluck='name')
    print(f"DocTypes in lmpharma module: {doctypes}")
    
    # Check if a workspace exists
    ws_exists = frappe.db.exists('Workspace', 'Lmpharma')
    print(f"Lmpharma Workspace Exists: {ws_exists}")

if __name__ == '__main__':
    run()
