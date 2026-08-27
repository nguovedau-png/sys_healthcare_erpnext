import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/gamemarketing')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    print(f"Installed Apps: {frappe.get_installed_apps()}")
    print(f"Game Marketing Workspace Exists: {frappe.db.exists('Workspace', 'Game Marketing')}")
    # List all Workspaces starting with Game
    workspaces = frappe.db.get_all('Workspace', filters={'name': ['like', 'Game%']}, pluck='name')
    print(f"Related Workspaces: {workspaces}")
    # List all DocTypes in gamemarketing
    doctypes = frappe.db.get_all('DocType', filters={'module': ['like', 'Game%']}, pluck='name')
    print(f"DocTypes in Game modules: {doctypes}")

if __name__ == '__main__':
    run()
