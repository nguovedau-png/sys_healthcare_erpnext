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
    
    # Check Hc Order specifically
    dt = 'Hc Order'
    module = frappe.db.get_value('DocType', dt, 'module')
    print(f'DocType: {dt}, Module: {module}')
    
    # Check if file exists in expected places
    paths = [
        frappe.get_app_path('booking', 'doctype', 'hc_order', 'hc_order.json'),
        frappe.get_app_path('booking', 'booking', 'doctype', 'hc_order', 'hc_order.json')
    ]
    for p in paths:
        exists = os.path.exists(p)
        print(f'Path: {p}, Exists: {exists}')
        
    try:
        from frappe.modules.utils import get_doctype_module
        mod = get_doctype_module(dt)
        print(f'Module from utils: {mod}')
    except Exception as e:
        print(f'Error get_doctype_module: {e}')

    try:
        meta = frappe.get_meta(dt)
        print(f'Meta loaded: {meta.name}')
    except Exception as e:
        print(f'Error get_meta: {e}')

if __name__ == '__main__':
    run()
