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
    print(f"Migrating '{ws_name}' to Categorized Link Cards...")
    
    # 1. Categories Mapping
    categories = [
        {'label': 'Recruitment & HR', 'doctypes': ['Job Posting', 'Job Application', 'Job Requirement', 'Job Company']},
        {'label': 'Content & Media', 'doctypes': ['News Post', 'News Topic', 'News Video', 'News Banner', 'News Category', 'News Author', 'News Comment', 'News Answer', 'News Top Search', 'News Static Page']},
        {'label': 'Learning Management', 'doctypes': ['Edu Course', 'Edu Lesson', 'Edu Enrollment', 'Edu Certificate', 'Edu Lecturer', 'Edu Question', 'Edu Quiz', 'Edu CPE Master Data', 'Edu CPE Dashboard Day', 'Edu CPE Dashboard Week', 'Edu CPE Dashboard Month']},
        {'label': 'Community & Forums', 'doctypes': ['Forum Topic', 'Forum Reply', 'QA Question', 'QA Answer', 'Support Group', 'Moderation Report']},
        {'label': 'Feedback & Surveys', 'doctypes': ['Survey Survey', 'Survey Response', 'Survey Answer Option', 'Survey Question Option']},
        {'label': 'Live Conferences', 'doctypes': ['LC Project', 'LC Session', 'LC Document', 'LC Poll', 'LC Whiteboard', 'LC Attendee', 'LC Livestream', 'LC Interpreter']}
    ]
    
    # 2. Reset everything
    ws.shortcuts = []
    ws.links = []
    content = []
    
    # 3. Populate Links table and Content JSON
    for cat in categories:
        # Add Header to content
        content.append({
            "type": "header",
            "data": { "text": cat['label'], "level": 3 }
        })
        
        # Add Card Break to Links table
        ws.append('links', {
            'label': cat['label'],
            'type': 'Card Break',
            'icon': 'folder-o'
        })
        
        # Add Links to table
        for dt in cat['doctypes']:
            ws.append('links', {
                'label': dt,
                'link_to': dt,
                'link_type': 'DocType',
                'type': 'Link'
            })
            
        # Add Card Block to content
        content.append({
            "type": "card",
            "data": { "card_name": cat['label'] }
        })
        
    ws.content = json.dumps(content)
    ws.module = "lmpharma"
    
    # Export to disk
    frappe.conf.developer_mode = 1
    ws.save(ignore_permissions=True)
    
    frappe.db.commit()
    frappe.clear_cache()
    
    # Verification
    links_count = frappe.db.count('Workspace Link', filters={'parent': ws_name})
    print(f"Migration complete. Added {links_count} links/breaks to '{ws_name}'.")
    print(f"Exported to disk: /Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/apps/lmpharma/lmpharma/lmpharma/workspace/lm_pharma/lm_pharma.json")

if __name__ == '__main__':
    run()
