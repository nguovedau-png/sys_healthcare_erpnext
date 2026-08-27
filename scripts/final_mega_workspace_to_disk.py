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
    print(f"Finalizing '{ws_name}' and syncing to disk...")
    
    # 1. Re-define categories
    categories = [
        {'label': 'Recruitment & HR', 'doctypes': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company']},
        {'label': 'Content & Media', 'doctypes': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page']},
        {'label': 'Learning Management', 'doctypes': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month']},
        {'label': 'Community & Forums', 'doctypes': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report']},
        {'label': 'Feedback & Surveys', 'doctypes': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option']},
        {'label': 'Live Conferences', 'doctypes': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']}
    ]
    
    # 2. Rebuild shortcuts table
    ws.shortcuts = []
    content = []
    total = 0
    
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
            # In Frappe v15, for standard workspaces, shortcut_name usually equals label if saved via UI
            # But the internal name is 10-char. We'll use the Label as the reference point for the content field if possible.
            # However, Game Marketing used the Label, so we will use the Label.
            ws.append('shortcuts', {
                'label': dt,
                'link_to': dt,
                'type': 'DocType',
                'idx': total + 1
            })
            shortcut_block["data"]["shortcuts"].append({
                "shortcut_name": dt, 
                "label": dt
            })
            total += 1
            
        content.append(shortcut_block)
        
    ws.content = json.dumps(content)
    ws.module = "lmpharma"
    
    # IMPORTANT: Ensure developer_mode is on for the save to write to disk
    frappe.conf.developer_mode = 1
    ws.save(ignore_permissions=True)
    
    frappe.db.commit()
    frappe.clear_cache()
    print(f"Success. DB updated and exported to disk. Total shortcuts: {total}")

if __name__ == '__main__':
    run()
