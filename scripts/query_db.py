import frappe
frappe.init(site='healthcare.local', sites_path='sites')
frappe.connect()

def run():
    res = frappe.db.sql("SELECT name, module, custom FROM tabDocType WHERE name = 'Hc Order'", as_dict=1)
    print(f"DB Result for Hc Order: {res}")
    
    # Check if 'Booking' exists as a Module Def
    res2 = frappe.db.sql("SELECT name FROM `tabModule Def` WHERE name IN ('Booking', 'booking')", as_dict=1)
    print(f"Module Defs found: {res2}")

if __name__ == '__main__':
    run()
