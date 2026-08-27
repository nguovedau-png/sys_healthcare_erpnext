import os, sys, shutil

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

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # Check Hc Order
    res = frappe.db.sql("SELECT name, module, custom FROM tabDocType WHERE name = 'Hc Order'", as_dict=1)
    print(f"DB Result for Hc Order: {res}")
    
    # Check if 'booking' or 'Booking' exists as a Module Def
    res2 = frappe.db.sql("SELECT name FROM `tabModule Def` WHERE name IN ('Booking', 'booking')", as_dict=1)
    print(f"Module Defs found: {res2}")
    
    if res:
        # Check all Hc doctypes
        hc_count = frappe.db.sql("SELECT count(*) FROM tabDocType WHERE name LIKE 'Hc%'")[0][0]
        print(f"Total Hc DocTypes in DB: {hc_count}")
        
    # Check current apps installed on site
    print(f"Apps on site: {frappe.get_installed_apps()}")

if __name__ == '__main__':
    run()
