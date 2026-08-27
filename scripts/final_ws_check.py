import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "LM Pharma"
    ws = frappe.get_doc('Workspace', ws_name)
    
    print(f"Workspace: {ws.name}")
    print(f"Content: {ws.content}")
    print(f"Shortcuts count: {len(ws.shortcuts)}")
    
    # Check if there is a Workspace Customization for the current user
    # In v15, customizations are stored in 'Workspace' with 'for_user' or 'Workspace Customization'
    customs = frappe.db.get_all('Workspace Customization', filters={'workspace': ws_name}, fields=['*'])
    print(f"Customizations: {customs}")

if __name__ == '__main__':
    run()
