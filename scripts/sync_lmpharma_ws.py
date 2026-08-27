import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe
from frappe.model.sync import sync_for

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    print("Syncing 'LM Pharma' workspace from app disk...")
    # This will re-import the workspace from the .json file in the app
    sync_for('lmpharma', 'Workspace', 'LM Pharma')
    frappe.db.commit()
    frappe.clear_cache()
    print("Sync complete.")

if __name__ == '__main__':
    run()
