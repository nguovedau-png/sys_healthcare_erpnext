import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/gamemarketing')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    apps = frappe.db.get_all('Installed App', pluck='name')
    print(f"Apps in tabInstalled App: {apps}")
    print(f"Is 'gamemarketing' in tabInstalled App? {'gamemarketing' in apps}")
    
    # Check Module Def
    if frappe.db.exists('Module Def', 'gamemarketing'):
        print("'gamemarketing' Module Def exists.")
    else:
        print("'gamemarketing' Module Def does NOT exist.")

if __name__ == '__main__':
    run()
