import os
import json
import frappe
from frappe.modules.import_file import import_doc

def sync_doctypes():
    site = 'healthcare.local'
    # Use sites folder
    sites_path = 'sites'
    
    print(f"Initializing Frappe for {site} in {sites_path}...")
    frappe.init(site=site, sites_path=sites_path)
    frappe.connect()
    
    base_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    doctype_path = os.path.join(base_path, 'apps/booking/booking/booking/doctype')
    if not os.path.exists(doctype_path):
        print(f"Error: {doctype_path} not found.")
        return

    # To successfully import, we need to ensure the module exists in the DB
    if not frappe.db.exists("Module Def", "booking"):
        print("Creating Module Def: booking")
        frappe.get_doc({
            "doctype": "Module Def",
            "module_name": "booking",
            "app_name": "booking"
        }).insert(ignore_permissions=True)
        frappe.db.commit()

    count = 0
    # Walk through the doctype directory
    for root, dirs, files in os.walk(doctype_path):
        for file in files:
            if file.endswith('.json'):
                path = os.path.join(root, file)
                # The import_doc function needs the relative path from the app root
                # actually, it's easier to just call it with the full path if we use a helper
                
                print(f"Syncing {path}...")
                try:
                    # We use standard frappe sync logic
                    # import_doc(path) might be tricky with absolute paths, 
                    # let's try reading and inserting/updating
                    with open(path, 'r') as f:
                        doc_dict = json.load(f)
                    
                    if frappe.db.exists(doc_dict['doctype'], doc_dict['name']):
                        doc = frappe.get_doc(doc_dict['doctype'], doc_dict['name'])
                        doc.update(doc_dict)
                        doc.save(ignore_permissions=True)
                        print(f"  Updated {doc_dict['name']}")
                    else:
                        doc = frappe.get_doc(doc_dict)
                        doc.insert(ignore_permissions=True)
                        print(f"  Inserted {doc_dict['name']}")
                    
                    count += 1
                except Exception as e:
                    print(f"  Failed {path}: {e}")

    frappe.db.commit()
    print(f"Sync complete. Total processed: {count}")
    frappe.destroy()

if __name__ == "__main__":
    sync_doctypes()
