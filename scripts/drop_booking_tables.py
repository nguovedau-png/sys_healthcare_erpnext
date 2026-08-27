import os, sys
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    tables = frappe.db.get_tables()
    hc_tables = [t for t in tables if t.startswith('tabHc ')] # Note space after Hc in 'tabHc ' for standard names
    # Also check without space if name is HcOrder
    hc_tables += [t for t in tables if t.startswith('tabHc') and t not in hc_tables]
    
    print(f"Found {len(hc_tables)} tables to drop.")
    for t in hc_tables:
        try:
            frappe.db.sql_ddl(f"DROP TABLE `{t}`")
            print(f"  Dropped {t}")
        except Exception as e:
            print(f"  Failed to drop {t}: {e}")
            
    frappe.db.commit()
    print("Cleanup finished.")

if __name__ == '__main__':
    run()
