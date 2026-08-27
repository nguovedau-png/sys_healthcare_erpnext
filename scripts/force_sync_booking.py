import os, sys

# Fix logging path issue
log_dir = 'healthcare.local/logs'
if not os.path.exists(log_dir):
    os.makedirs(log_dir, exist_ok=True)

# Add apps to sys.path
cwd = os.getcwd()
sys.path.extend([
    os.path.join(cwd, 'apps/frappe'),
    os.path.join(cwd, 'apps/erpnext'),
    os.path.join(cwd, 'apps/booking')
])

import frappe
from frappe.model.sync import sync_for

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    print("Ensuring 'booking' Module Def exists...")
    if not frappe.db.exists('Module Def', 'booking'):
        frappe.get_doc({
            'doctype': 'Module Def',
            'module_name': 'booking',
            'app_name': 'booking',
            'custom': 0
        }).insert(ignore_permissions=True)
        frappe.db.commit()
        print("Created 'booking' Module Def.")
    else:
        print("'booking' Module Def exists.")

    print("\nStarting Force Sync for 'booking' app...")
    try:
        # sync_for(app_name, force=False, sync_everything=False, verbose=False)
        sync_for('booking', force=True, verbose=True)
        frappe.db.commit()
        print("\nForce Sync completed successfully.")
    except Exception as e:
        print(f"\nError during sync: {e}")
        import traceback
        traceback.print_exc()

    # Verify Hc Order
    if frappe.db.exists('DocType', 'Hc Order'):
        print("\nVerification SUCCESS: 'Hc Order' now exists in DB.")
    else:
        print("\nVerification FAILED: 'Hc Order' still missing from DB.")

    frappe.clear_cache()
    print("Cache cleared.")

if __name__ == '__main__':
    run()
