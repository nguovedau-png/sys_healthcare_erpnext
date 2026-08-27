import json, os, sys

# Add apps to sys.path
cwd = os.getcwd()
sys.path.extend([
    os.path.join(cwd, 'apps/frappe'),
    os.path.join(cwd, 'apps/erpnext'),
    os.path.join(cwd, 'apps/booking')
])

import frappe

# Prevent logging error
def dummy_logger(*args, **kwargs):
    import logging
    return logging.getLogger("dummy")
frappe.logger = dummy_logger

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # 1. Ensure "Booking" Module Def exists
    if not frappe.db.exists('Module Def', 'Booking'):
        print('Creating Booking Module Def...')
        frappe.get_doc({
            'doctype': 'Module Def',
            'module_name': 'Booking',
            'app_name': 'booking',
            'custom': 0
        }).insert(ignore_permissions=True)
        frappe.db.commit()
    
    # 2. Update Hc DocTypes
    print('Updating Hc DocType modules to "Booking"...')
    hc_doctypes = frappe.db.get_all('DocType', filters={'name': ['like', 'Hc%']}, pluck='name')
    updated_count = 0
    for dt_name in hc_doctypes:
        current_module = frappe.db.get_value('DocType', dt_name, 'module')
        if current_module != 'Booking':
            frappe.db.set_value('DocType', dt_name, 'module', 'Booking', update_modified=False)
            updated_count += 1
            
    if updated_count > 0:
        frappe.db.commit()
        print(f'Successfully updated {updated_count} DocTypes.')
    else:
        print('All Hc DocTypes already have correct module assignment.')
        
    # 3. Clear cache to reflect change
    frappe.clear_cache()
    print('Cache cleared.')

if __name__ == '__main__':
    run()
