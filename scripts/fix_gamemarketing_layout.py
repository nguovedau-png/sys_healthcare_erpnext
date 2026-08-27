import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/gamemarketing')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "Game Marketing"
    print(f"Fixing layout for '{ws_name}'...")
    
    ws = frappe.get_doc('Workspace', ws_name)
    
    # Generate content JSON blocks
    content = [
        {
            "type": "header",
            "data": {
                "text": "Game Marketing",
                "level": 1
            }
        },
        {
            "type": "shortcut",
            "data": {
                "shortcuts": []
            }
        },
        {
            "type": "header",
            "data": {
                "text": "All Modules",
                "level": 4
            }
        },
        {
            "type": "card",
            "data": {
                "card_name": "All Marketing Modules"
            }
        }
    ]
    
    # Map shortcuts from table to content block
    for s in ws.shortcuts:
        content[1]["data"]["shortcuts"].append({
            "shortcut_name": s.label,
            "label": s.label
        })
        
    ws.content = json.dumps(content)
    ws.save(ignore_permissions=True)
    frappe.db.commit()
    print(f"Successfully updated 'content' field for '{ws_name}' with {len(ws.shortcuts)} shortcut blocks.")
    
    frappe.clear_cache()

if __name__ == '__main__':
    run()
