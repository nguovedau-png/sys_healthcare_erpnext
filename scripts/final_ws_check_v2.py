import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "LM Pharma"
    ws = frappe.get_doc('Workspace', ws_name)
    
    print(f"Workspace Name: {ws.name}")
    print(f"Shortcuts count: {len(ws.shortcuts)}")
    if ws.shortcuts:
        print(f"First 5 shortcuts: {[(s.name, s.label) for s in ws.shortcuts[:5]]}")
    
    # Check for any other Workspace with the same title or similar
    all_ws = frappe.db.get_all('Workspace', filters={'title': 'LM Pharma'}, fields=['name', 'public', 'is_hidden'])
    print(f"All Workspaces with Title 'LM Pharma': {all_ws}")

if __name__ == '__main__':
    run()
