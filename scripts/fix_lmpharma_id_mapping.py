import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_name = "LM Pharma"
    ws = frappe.get_doc('Workspace', ws_name)
    print(f"Fixing ID mapping for '{ws_name}'...")
    
    # 1. Map labels to internal IDs (names)
    label_to_id = {s.label: s.name for s in ws.shortcuts}
    
    # 2. Re-define categories
    categories = [
        {'label': 'Recruitment & HR', 'doctypes': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company']},
        {'label': 'Content & Media', 'doctypes': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page']},
        {'label': 'Learning Management', 'doctypes': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month']},
        {'label': 'Community & Forums', 'doctypes': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report']},
        {'label': 'Feedback & Surveys', 'doctypes': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option']},
        {'label': 'Live Conferences', 'doctypes': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']}
    ]
    
    content = []
    mapped_count = 0
    
    for cat in categories:
        content.append({
            "type": "header",
            "data": { "text": cat['label'], "level": 3 }
        })
        
        shortcut_block = {
            "type": "shortcut",
            "data": { "shortcuts": [] }
        }
        
        for dt in cat['doctypes']:
            internal_id = label_to_id.get(dt)
            if internal_id:
                shortcut_block["data"]["shortcuts"].append({
                    "shortcut_name": internal_id, # THE FIX: Use unique ID not Label
                    "label": dt
                })
                mapped_count += 1
            else:
                print(f"  Warning: No shortcut record found for '{dt}'")
                
        content.append(shortcut_block)
        
    ws.content = json.dumps(content)
    ws.save(ignore_permissions=True)
    
    frappe.db.commit()
    frappe.clear_cache()
    print(f"Success. Mapped {mapped_count} shortcuts via internal IDs.")

if __name__ == '__main__':
    run()
