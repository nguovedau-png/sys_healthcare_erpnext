import frappe
import random
import string
import os, sys
from frappe.utils import nowdate, now_datetime

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def run_fix():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    missing_dts = ['Edu Lecturer', 'LC Document', 'News Category']
    master_data = {
        'LC Project': frappe.db.get_value('LC Project', {}, 'name') or 'TEST-LC-PROJECT',
        'LC Session': frappe.db.get_value('LC Session', {}, 'name') or 'TEST-LC-SESSION'
    }

    for dt in missing_dts:
        print(f"Fixing {dt}...")
        meta = frappe.get_meta(dt)
        table = f"tab{dt}"
        valid_cols = frappe.db.get_table_columns(dt)
        
        count = frappe.db.count(dt)
        for i in range(100 - count):
            try:
                name = f"FIX-{dt[0:4].upper()}-{random_string(6)}"
                # Standard fields
                doc_data = {
                    'name': name,
                    'creation': nowdate(),
                    'modified': nowdate(),
                    'owner': 'Administrator',
                    'modified_by': 'Administrator',
                    'docstatus': 0
                }
                
                # Add mandatory fields from meta
                for f in meta.fields:
                    if f.reqd and f.fieldname in valid_cols and f.fieldname not in doc_data:
                        if f.fieldtype == 'Link':
                            doc_data[f.fieldname] = master_data.get(f.options) or frappe.db.get_value(f.options, {}, 'name')
                        elif f.fieldtype in ['Int', 'Float']: doc_data[f.fieldname] = 10
                        elif f.fieldtype == 'Date': doc_data[f.fieldname] = nowdate()
                        else: doc_data[f.fieldname] = f"FixedData {random_string(4)}"
                
                # Filter doc_data to only include valid columns to avoid duplicates (like 'owner')
                cols = [c for c in doc_data.keys() if c in valid_cols]
                vals = [doc_data[c] for c in cols]
                
                col_str = ", ".join([f"`{c}`" for c in cols])
                placeholders = ", ".join(["%s"] * len(vals))
                frappe.db.sql(f"INSERT INTO `{table}` ({col_str}) VALUES ({placeholders})", tuple(vals))
            except Exception as e:
                if i == 0: print(f"  First error for {dt}: {e}")
                pass
        
        frappe.db.commit()
        print(f"  {dt} count: {frappe.db.count(dt)}")

if __name__ == '__main__':
    run_fix()
