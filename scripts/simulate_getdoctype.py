import os, sys, json
log_dir = 'healthcare.local/logs'
if not os.path.exists(log_dir):
    os.makedirs(log_dir, exist_ok=True)
cwd = os.getcwd()
sys.path.extend([os.path.join(cwd, 'apps/frappe'), os.path.join(cwd, 'apps/erpnext'), os.path.join(cwd, 'apps/booking')])
import frappe

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    from frappe.desk.form.load import getdoctype
    dt = 'Hc Order'
    print(f"Simulating getdoctype for '{dt}'...")
    
    # Mock local.response
    from frappe import _dict
    frappe.local.response = _dict({"docs": []})
    
    try:
        getdoctype(dt)
        print("getdoctype completed successfully server-side.")
        print(f"Response docs count: {len(frappe.response.docs)}")
    except Exception as e:
        print(f"FAILED getdoctype: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    run()
