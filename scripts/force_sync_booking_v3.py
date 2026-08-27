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
    
    print(f"Starting Force Sync for '{app_name}' app from NEW (restored) nested path...")
    try:
        # Signature: def sync_for(app_name, force=0, reset_permissions=False):
        sync_for(app_name, force=True)
        frappe.db.commit()
        print("\nForce Sync completed successfully.")
    except Exception as e:
        print(f"\nError during sync: {e}")
        import traceback
        traceback.print_exc()

    # Final check
    hc_order_exists = frappe.db.exists('DocType', 'Hc Order')
    print(f"\nVerification: 'Hc Order' exists in DB: {hc_order_exists}")
    
    if hc_order_exists:
        hc_doctypes = frappe.db.get_all('DocType', filters={'name': ['like', 'Hc%']}, pluck='name')
        print(f"Total Hc DocTypes now in DB: {len(hc_doctypes)}")
        
        # Check module
        mod = frappe.db.get_value('DocType', 'Hc Order', 'module')
        print(f"Hc Order module in DB: {mod}")

    frappe.clear_cache()
    print("Cache cleared.")

if __name__ == '__main__':
    run()
