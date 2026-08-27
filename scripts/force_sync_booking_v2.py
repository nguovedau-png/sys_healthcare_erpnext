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
    
    app_name = 'booking'
    
    # Check what frappe thinks are modules for this app
    from frappe.utils import get_app_modules
    app_modules = get_app_modules(app_name)
    print(f"Detected modules for '{app_name}': {app_modules}")
    
    if not app_modules:
        print("WARNING: No modules detected for 'booking'. Sync might fail.")
        # Manual fix: find folders that have doctype inside
        app_path = frappe.get_app_path(app_name)
        print(f"App path: {app_path}")
        # Try to find modules manually
        for folder in os.listdir(app_path):
            if os.path.exists(os.path.join(app_path, folder, 'doctype')):
                print(f"Found module candidate: {folder}")

    print("\nStarting Force Sync for 'booking' app...")
    try:
        # Signature: def sync_for(app_name, force=0, reset_permissions=False):
        sync_for(app_name, force=1)
        frappe.db.commit()
        print("\nForce Sync completed successfully.")
    except Exception as e:
        print(f"\nError during sync: {e}")
        import traceback
        traceback.print_exc()

    # Final check
    hc_order_exists = frappe.db.exists('DocType', 'Hc Order')
    print(f"\nVerification: 'Hc Order' exists in DB: {hc_order_exists}")
    
    # List first 10 Hc Doctypes if any
    if hc_order_exists:
        hc_doctypes = frappe.db.get_all('DocType', filters={'name': ['like', 'Hc%']}, pluck='name')
        print(f"Total Hc DocTypes now in DB: {len(hc_doctypes)}")

    frappe.clear_cache()
    print("Cache cleared.")

if __name__ == '__main__':
    run()
