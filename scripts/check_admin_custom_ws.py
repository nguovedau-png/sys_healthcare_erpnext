import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # Check for any private workspace for Administrator that might be shadowing LM Pharma
    # Name would be like "LM Pharma-Administrator" or just LM Pharma with for_user set
    ws = frappe.get_all('Workspace', filters={'title': 'LM Pharma', 'for_user': 'Administrator'}, fields=['name', 'for_user', 'public'])
    print(f"Admin Private Workspaces: {ws}")
    
    if ws:
        print("FOUND PRIVATE WORKSPACE! This is shadowing the public one.")
        for w in ws:
            frappe.delete_doc('Workspace', w.name)
        frappe.db.commit()
        frappe.clear_cache()
        print("Deleted private workspaces. Public one should now show.")
    else:
        print("No private workspaces found for Administrator.")

if __name__ == '__main__':
    run()
