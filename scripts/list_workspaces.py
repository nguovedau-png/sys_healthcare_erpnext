import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    workspaces = frappe.get_all('Workspace', fields=['name', 'title', 'module'])
    print(f"Total Workspaces: {len(workspaces)}")
    for ws in workspaces:
        print(f"Name: {ws.name} | Title: {ws.title} | Module: {ws.module}")

if __name__ == '__main__':
    run()
