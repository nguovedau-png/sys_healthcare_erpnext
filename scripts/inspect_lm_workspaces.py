import os, sys, json
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/lmpharma')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # Search for any workspace with title containing LM or matching the 5 categories
    titles = ['Jobs', 'News', 'Forums', 'Surveys', 'Educations']
    workspaces = frappe.db.get_all('Workspace', filters={'title': ['in', titles]}, fields=['name', 'title', 'module', 'content'])
    
    print(f"Found {len(workspaces)} workspaces matching titles.")
    for ws in workspaces:
        print(f"Workspace: {ws.name} | Title: {ws.title} | Module: {ws.module}")
        print(f"  Content length: {len(ws.content) if ws.content else 0}")
        # shortcuts count
        s_count = frappe.db.count('Workspace Shortcut', filters={'parent': ws.name})
        print(f"  Shortcuts table count: {s_count}")

if __name__ == '__main__':
    run()
