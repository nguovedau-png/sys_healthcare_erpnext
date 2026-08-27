import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/gamemarketing')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "Game Marketing"
    ws = frappe.get_doc('Workspace', ws_name)
    
    print(f"Workspace: {ws.name}")
    print(f"Title: {ws.title}")
    print(f"Content: {ws.content}")
    print(f"Shortcuts count: {len(ws.shortcuts)}")
    print(f"First 5 shortcuts: {[s.label for s in ws.shortcuts[:5]]}")
    
    # Check if there is any Workspace Customization for Administrator
    customs = frappe.get_all('Workspace Customization', filters={'workspace': ws_name, 'user': 'Administrator'})
    print(f"Customizations for Admin: {customs}")

if __name__ == '__main__':
    run()
