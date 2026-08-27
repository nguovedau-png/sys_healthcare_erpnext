import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/booking')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    # Use internal method to see what modules frappe detects for booking
    from frappe.utils import get_app_modules
    try:
        modules = get_app_modules('booking')
        print(f"Modules for 'booking': {modules}")
    except:
        # Alternative in newer versions
        from frappe.modules.utils import get_modules
        print(f"Modules: {get_modules('booking')}")

if __name__ == '__main__':
    run()
