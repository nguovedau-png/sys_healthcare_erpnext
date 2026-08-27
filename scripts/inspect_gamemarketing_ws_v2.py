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
    print(f"Content: {ws.content}")
    print(f"Shortcuts count: {len(ws.shortcuts)}")

if __name__ == '__main__':
    run()
