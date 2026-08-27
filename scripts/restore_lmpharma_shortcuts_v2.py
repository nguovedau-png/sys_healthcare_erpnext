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

def setup_shortcuts(ws_name, doctypes):
    if not frappe.db.exists('Workspace', ws_name):
        print(f"Error: Workspace '{ws_name}' missing.")
        return False
        
    ws = frappe.get_doc('Workspace', ws_name)
    print(f"Updating '{ws_name}'...")
    
    # Preserve parent_page and other core settings
    parent = ws.parent_page
    
    ws.shortcuts = []
    for i, dt in enumerate(doctypes):
        ws.append('shortcuts', {
            'label': dt,
            'link_to': dt,
            'type': 'DocType',
            'idx': i + 1
        })
        
    # Also update content field for v15
    ws.content = generate_v15_content(ws.title or ws_name, doctypes)
    ws.save(ignore_permissions=True)
    return True

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # Corrected names matching the database
    mappings = {
        'Jobs': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company'],
        'News': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page'],
        'Educations': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month'],
        'Forums': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report'],
        'Surveys': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option'],
        'Live Conference': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']
    }
    
    for ws_name, doctypes in mappings.items():
        success = setup_shortcuts(ws_name, doctypes)
        if success:
            # Verify count in DB immediately
            count = frappe.db.count('Workspace Shortcut', filters={'parent': ws_name})
            print(f"  Verified: {count} shortcuts saved for '{ws_name}' in database.")
    
    frappe.db.commit()
    frappe.clear_cache()
    print("Restore complete.")

if __name__ == '__main__':
    run()
