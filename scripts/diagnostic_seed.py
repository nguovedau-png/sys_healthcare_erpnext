import frappe
import random
import string
import os, sys
from frappe.utils import nowdate, now_datetime

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def run_diag():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dt = 'Hc Activity Log'
    meta = frappe.get_meta(dt)
    table = f"tab{dt}"
    valid_cols = frappe.db.get_table_columns(dt)
    
    print(f"Diagnostic for {dt}:")
    print(f"  Valid Columns: {valid_cols}")
    
    cols = ['name', 'creation', 'modified', 'owner', 'modified_by', 'docstatus']
    vals = [f"DIAG-{random_string(5)}", nowdate(), nowdate(), 'Administrator', 'Administrator', 0]
    
    # Add mandatory fields
    for f in meta.fields:
        if f.reqd:
            print(f"  Adding Mandatory: {f.fieldname} ({f.fieldtype})")
            val = "DiagVal" if f.fieldtype == 'Data' else nowdate()
            if f.fieldname not in cols:
                cols.append(f.fieldname); vals.append(val)
    
    col_str = ", ".join([f"`{c}`" for c in cols])
    placeholders = ", ".join(["%s"] * len(vals))
    query = f"INSERT INTO `{table}` ({col_str}) VALUES ({placeholders})"
    print(f"  Query: {query}")
    print(f"  Vals: {vals}")
    
    try:
        frappe.db.sql(query, tuple(vals))
        frappe.db.commit()
        print("  SUCCESS!")
    except Exception as e:
        print(f"  FAILURE: {e}")

if __name__ == '__main__':
    run_diag()
