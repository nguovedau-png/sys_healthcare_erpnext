import frappe
frappe.init(site='healthcare.local', sites_path='sites')
frappe.connect()

def check():
    name = 'Hc Order'
    module = frappe.db.get_value('DocType', name, 'module')
    print(f'DocType: {name}, Module: {module}')
    
    try:
        meta = frappe.get_meta(name)
        print(f'Meta found: {meta.name}')
    except Exception as e:
        print(f'Error loading meta: {e}')
    
    # Check all Hc doctypes
    hc_doctypes = frappe.db.get_all('DocType', filters={'name': ['like', 'Hc%']}, pluck='name')
    print(f'Total Hc DocTypes in DB: {len(hc_doctypes)}')
    if hc_doctypes:
        print(f'Sample: {hc_doctypes[:5]}')

if __name__ == '__main__':
    check()
