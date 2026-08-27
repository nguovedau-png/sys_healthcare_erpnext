import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "LM Pharma"
    if not frappe.db.exists('Workspace', ws_name):
        print(f"Error: Workspace '{ws_name}' missing.")
        return
        
    ws = frappe.get_doc('Workspace', ws_name)
    print(f"Transforming '{ws_name}' into Mega-Workspace...")
    
    # 1. Categories Mapping
    categories = [
        {'label': 'Recruitment & HR', 'doctypes': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company']},
        {'label': 'Content & Media', 'doctypes': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page']},
        {'label': 'Learning Management', 'doctypes': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month']},
        {'label': 'Community & Forums', 'doctypes': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report']},
        {'label': 'Feedback & Surveys', 'doctypes': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option']},
        {'label': 'Live Conferences', 'doctypes': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']}
    ]
    
    # 2. Reset shortcuts and build table
    ws.shortcuts = []
    ws.links = [] # Reset links as well to avoid confusion
    
    content = []
    total_shortcuts = 0
    
    for cat in categories:
        # Add Header to content
        content.append({
            "type": "header",
            "data": { "text": cat['label'], "level": 3 }
        })
        
        shortcut_block = {
            "type": "shortcut",
            "data": { "shortcuts": [] }
        }
        
        # Add each DocType to shortcut table and block
        for dt in cat['doctypes']:
            ws.append('shortcuts', {
                'label': dt,
                'link_to': dt,
                'type': 'DocType',
                'idx': total_shortcuts + 1
            })
            shortcut_block["data"]["shortcuts"].append({
                "shortcut_name": dt,
                "label": dt
            })
            total_shortcuts += 1
            
        content.append(shortcut_block)
        
    ws.content = json.dumps(content)
    ws.save(ignore_permissions=True)
    
    frappe.db.commit()
    frappe.clear_cache()
    print(f"Transformation complete. '{ws_name}' now hosts {total_shortcuts} DocType shortcuts in 6 sections.")

if __name__ == '__main__':
    run()
