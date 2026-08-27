import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def generate_v15_content(title, shortcuts_list):
    content = [
        {
            "type": "header",
            "data": { "text": title, "level": 1 }
        },
        {
            "type": "shortcut",
            "data": { "shortcuts": [] }
        }
    ]
    for s in shortcuts_list:
        content[1]["data"]["shortcuts"].append({
            "shortcut_name": s,
            "label": s
        })
    return json.dumps(content)

def setup_workspace(ws_name, title, doctypes):
    print(f"Setting up workspace '{ws_name}' ({title})...")
    
    if not frappe.db.exists('Workspace', ws_name):
        ws = frappe.get_doc({
            'doctype': 'Workspace',
            'label': ws_name,
            'title': title,
            'module': 'Lmpharma',
            'public': 1,
            'type': 'Workspace',
            'icon': 'folder'
        })
        ws.insert(ignore_permissions=True)
    else:
        ws = frappe.get_doc('Workspace', ws_name)
        ws.title = title
    
    ws.shortcuts = []
    ws.links = []
    
    for i, dt in enumerate(doctypes):
        ws.append('shortcuts', {
            'label': dt,
            'link_to': dt,
            'type': 'DocType',
            'idx': i + 1
        })
        
    ws.content = generate_v15_content(title, doctypes)
    ws.save(ignore_permissions=True)
    print(f"  Done. Added {len(doctypes)} shortcuts.")

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    mappings = {
        'LM Jobs': {
            'title': 'Jobs',
            'doctypes': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company']
        },
        'LM News': {
            'title': 'News',
            'doctypes': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page']
        },
        'LM Educations': {
            'title': 'Educations',
            'doctypes': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month']
        },
        'LM Forums': {
            'title': 'Forums',
            'doctypes': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report']
        },
        'LM Surveys': {
            'title': 'Surveys',
            'doctypes': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option']
        },
        'LM Live Conference': {
            'title': 'Live Conference',
            'doctypes': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']
        }
    }
    
    for ws_name, config in mappings.items():
        setup_workspace(ws_name, config['title'], config['doctypes'])
        
    frappe.db.commit()
    frappe.clear_cache()
    print("All Lmpharma workspaces updated successfully.")

if __name__ == '__main__':
    run()
