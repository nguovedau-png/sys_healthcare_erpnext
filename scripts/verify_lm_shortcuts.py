import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_list = ['LM Pharma', 'LM Jobs', 'LM News', 'LM Educations', 'LM Forums', 'LM Surveys', 'LM Live Conference']
    for ws_name in ws_list:
        print(f"Workspace: {ws_name}")
        shortcuts = frappe.get_all('Workspace Shortcut', filters={'parent': ws_name}, fields=['label', 'type', 'link_to', 'url'])
        print(f"  Count: {len(shortcuts)}")
        for s in shortcuts[:5]:
            print(f"    - {s.label} ({s.type})")
        if len(shortcuts) > 5:
            print(f"    ... {len(shortcuts)-5} more")

if __name__ == '__main__':
    run()
