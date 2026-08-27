import frappe
import random
import string
import os, sys
from frappe.utils import nowdate, now_datetime

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_db_value(field):
    if field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    elif field.fieldtype in ['Date']: return nowdate()
    elif field.fieldtype in ['Datetime']: return now_datetime()
    elif field.fieldtype in ['Check']: return random.choice([0, 1])
    elif field.fieldtype in ['Data', 'Text']: return f"GMSeed {field.label} {random_string(5)}"
    elif field.fieldtype == 'Select':
        options = (field.options or '').split('\n')
        options = [o.strip() for o in options if o.strip()]
        return random.choice(options) if options else ""
    return None

def run_seed():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    dts = frappe.get_all('DocType', filters={'module': 'gamemarketing'}, fields=['name'])
    print(f"Seeding {len(dts)} DocTypes in 'gamemarketing'...")
    
    total = 0
    for d_row in dts:
        dt = d_row.name
        count = frappe.db.count(dt)
        if count >= 100:
            print(f"  Skipping {dt} (count={count})")
            continue
            
        print(f"  Seeding {dt}...")
        meta = frappe.get_meta(dt)
        table = f"tab{dt}"
        valid_cols = frappe.db.get_table_columns(dt)
        
        success = 0
        for i in range(100 - count):
            try:
                # Name (Counter for bigint)
                name = i + 1
                
                # Standard fields
                doc_data = {
                    'name': name,
                    'creation': nowdate(),
                    'modified': nowdate(),
                    'owner': 'Administrator',
                    'modified_by': 'Administrator',
                    'docstatus': 0
                }
                
                # Add mandatory fields
                for f in meta.fields:
                    if (f.reqd or random.random() > 0.4) and f.fieldname in valid_cols and f.fieldname not in doc_data:
                        val = get_db_value(f)
                        if val is not None:
                            doc_data[f.fieldname] = val
                
                cols = [c for c in doc_data.keys() if c in valid_cols]
                vals = [doc_data[c] for c in cols]
                
                col_str = ", ".join([f"`{c}`" for c in cols])
                placeholders = ", ".join(["%s"] * len(vals))
                frappe.db.sql(f"INSERT INTO `{table}` ({col_str}) VALUES ({placeholders})", tuple(vals))
                success += 1
                total += 1
            except Exception: pass
        
        if success > 0:
            print(f"    Inserted {success} records into {dt}")
            frappe.db.commit()
            
    print(f"Seeding finished. Total records inserted: {total}")

if __name__ == '__main__':
    run_seed()
