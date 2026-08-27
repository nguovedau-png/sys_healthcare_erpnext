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
    os.path.join(cwd, 'apps/gamemarketing')
])

import frappe
from frappe.installer import install_app

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    app_name = 'gamemarketing'
    print(f"Installing '{app_name}' on site 'healthcare.local' with force=True...")
    try:
        # Signature: install_app(name, verbose=False, set_as_patched=True, force=False)
        install_app(app_name, force=True)
        frappe.db.commit()
        print(f"Successfully installed '{app_name}'.")
    except Exception as e:
        print(f"Error installing app: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    run()
