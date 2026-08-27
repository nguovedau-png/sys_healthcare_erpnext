import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    ws_list = ['lm_educations', 'lm_forums', 'lm_jobs', 'lm_news', 'lm_surveys']
    for ws_name in ws_list:
        exists = frappe.db.exists('Workspace', ws_name)
        print(f"Workspace '{ws_name}' exists: {exists}")
        if exists:
            ws = frappe.get_doc('Workspace', ws_name)
            print(f"  Content: {ws.content}")
            print(f"  Shortcuts count: {len(ws.shortcuts)}")

if __name__ == '__main__':
    run()
