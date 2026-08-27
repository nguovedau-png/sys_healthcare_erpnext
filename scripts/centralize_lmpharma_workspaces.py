import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    parent_name = "LM Pharma"
    print(f"Creating Parent Workspace '{parent_name}'...")
    
    if not frappe.db.exists('Workspace', parent_name):
        ws_parent = frappe.get_doc({
            'doctype': 'Workspace',
            'label': parent_name,
            'title': parent_name,
            'module': 'Lmpharma',
            'public': 1,
            'type': 'Workspace',
            'icon': 'folder-o'
        })
        ws_parent.insert(ignore_permissions=True)
    else:
        ws_parent = frappe.get_doc('Workspace', parent_name)
    
    child_workspaces = [
        'LM Jobs', 'LM News', 'LM Educations', 'LM Forums', 'LM Surveys', 'LM Live Conference'
    ]
    
    # 1. Update children
    for child_ws in child_workspaces:
        if frappe.db.exists('Workspace', child_ws):
            print(f"Nesting '{child_ws}' under '{parent_name}'...")
            frappe.db.set_value('Workspace', child_ws, 'parent_page', parent_name)
        else:
            print(f"Warning: Child Workspace '{child_ws}' not found.")
            
    # 2. Add shortcuts to parent landing page
    ws_parent.shortcuts = []
    content = [
        {
            "type": "header",
            "data": { "text": parent_name, "level": 1 }
        },
        {
            "type": "shortcut",
            "data": { "shortcuts": [] }
        }
    ]
    
    icons = {
        'LM Jobs': 'briefcase',
        'LM News': 'newspaper',
        'LM Educations': 'education',
        'LM Forums': 'users',
        'LM Surveys': 'check-square-o',
        'LM Live Conference': 'video-camera'
    }
    
    for i, child_ws in enumerate(child_workspaces):
        # We add shortcuts pointing to the Workspace pages
        label = frappe.db.get_value('Workspace', child_ws, 'title') or child_ws
        ws_parent.append('shortcuts', {
            'label': label,
            'link_to': child_ws,
            'type': 'Workspace', # Link to another workspace
            'icon': icons.get(child_ws, 'folder'),
            'idx': i + 1
        })
        content[1]["data"]["shortcuts"].append({
            "shortcut_name": label,
            "label": label
        })
        
    ws_parent.content = json.dumps(content)
    ws_parent.save(ignore_permissions=True)
    
    frappe.db.commit()
    frappe.clear_cache()
    print(f"Centralization complete. '{parent_name}' now hosts {len(child_workspaces)} sub-modules.")

if __name__ == '__main__':
    run()
