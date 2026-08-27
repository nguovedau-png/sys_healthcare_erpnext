import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/gamemarketing')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "Game Marketing"
    print(f"Configuring workspace '{ws_name}'...")
    
    if not frappe.db.exists('Workspace', ws_name):
        print(f"Creating Workspace '{ws_name}'...")
        ws = frappe.get_doc({
            'doctype': 'Workspace',
            'label': ws_name,
            'module': 'gamemarketing',
            'public': 1,
            'icon': 'gamepad',
            'type': 'Workspace'
        })
        ws.insert(ignore_permissions=True)
    else:
        ws = frappe.get_doc('Workspace', ws_name)
    
    # 1. Collect all DocTypes in gamemarketing module
    doctypes = frappe.db.get_all('DocType', filters={'module': 'gamemarketing'}, pluck='name')
    print(f"Found {len(doctypes)} DocTypes in gamemarketing module.")
    
    # 2. CLEAR ALL PREVIOUS LINKS (To avoid LinkValidationError)
    ws.links = []
    ws.shortcuts = []
    ws.cards = []
    
    # 3. Standardize names for shortcuts
    shortcuts = []
    priorities = ['Gm Game', 'gm_campaign', 'gm_reward', 'gm_winner', 'gm_package']
    
    for dt in priorities:
        if dt in doctypes:
            shortcuts.append({
                'label': dt,
                'link_to': dt,
                'type': 'DocType'
            })
            doctypes.remove(dt)
            
    doctypes.sort()
    for dt in doctypes:
        shortcuts.append({
            'label': dt,
            'link_to': dt,
            'type': 'DocType'
        })
        
    # 4. Add new shortcuts
    for i, s in enumerate(shortcuts):
        ws.append('shortcuts', {
            'label': s['label'],
            'link_to': s['link_to'],
            'type': s['type'],
            'idx': i + 1
        })
        
    # 5. Add a simple Card for better layout
    ws.append('links', {
        'type': 'Card Break',
        'label': 'Marketing Management',
        'idx': 1
    })
    
    # Also add them as links for the cards
    for i, s in enumerate(shortcuts):
        ws.append('links', {
            'label': s['label'],
            'link_to': s['link_to'],
            'link_type': 'DocType',
            'type': 'Link',
            'idx': i + 2
        })
        
    ws.save(ignore_permissions=True)
    frappe.db.commit()
    print(f"Successfully updated workspace '{ws_name}' with {len(shortcuts)} shortcuts and cleared old broken links.")
    
    frappe.clear_cache()

if __name__ == '__main__':
    run()
