import frappe
import random
import string
import os, sys
from frappe.utils import nowdate, now_datetime

def random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_db_value(field, master_data):
    if field.fieldtype == 'Link' and field.options in master_data:
        return master_data[field.options]
    elif field.fieldtype == 'Link':
        # Fallback to an existing record or create none
        return frappe.db.get_value(field.options, {}, 'name')
    elif field.fieldtype in ['Int', 'Float', 'Currency']:
        return random.randint(10, 500)
    elif field.fieldtype in ['Date']: return nowdate()
    elif field.fieldtype in ['Datetime']: return now_datetime()
    elif field.fieldtype in ['Check']: return random.choice([0, 1])
    elif field.fieldtype in ['Data', 'Text']: return f"PharmaSeed {field.label} {random_string(5)}"
    elif field.fieldtype == 'Select':
        options = (field.options or '').split('\n')
        options = [o.strip() for o in options if o.strip()]
        return random.choice(options) if options else ""
    return None

def seed_dt(dt, master_data):
    count = frappe.db.count(dt)
    if count >= 100:
        return f"Skipping {dt}"
        
    meta = frappe.get_meta(dt)
    table = f"tab{dt}"
    valid_cols = frappe.db.get_table_columns(dt)
    
    success = 0
    for i in range(100 - count):
        try:
            name = f"LM-{dt[0:4].upper()}-{random_string(6)}"
            cols = ['name', 'creation', 'modified', 'owner', 'modified_by', 'docstatus']
            vals = [name, nowdate(), nowdate(), 'Administrator', 'Administrator', 0]
            
            for f in meta.fields:
                if (f.reqd or random.random() > 0.4) and f.fieldname in valid_cols:
                    val = get_db_value(f, master_data)
                    if val is not None:
                        cols.append(f.fieldname); vals.append(val)
            
            col_str = ", ".join([f"`{c}`" for c in cols])
            placeholders = ", ".join(["%s"] * len(vals))
            frappe.db.sql(f"INSERT INTO `{table}` ({col_str}) VALUES ({placeholders})", tuple(vals))
            success += 1
        except Exception: pass
    
    frappe.db.commit()
    return f"Inserted {success} in {dt}"

def run_seed():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    # 1. Level 0
    level0 = ['Edu Lecturer', 'LC Project', 'News Category', 'Job Company', 'Survey Survey', 'News Author']
    print("Phase 1: Seeding Level 0...")
    master_data = {}
    for dt in level0:
        print(f"  {seed_dt(dt, master_data)}")
        master_data[dt] = frappe.db.get_value(dt, {}, 'name')

    # 2. Level 1
    level1 = ['Edu Course', 'LC Session', 'News Post', 'Job Posting', 'Forum Topic', 'LC Attendee']
    print("Phase 2: Seeding Level 1...")
    for dt in level1:
        print(f"  {seed_dt(dt, master_data)}")
        master_data[dt] = frappe.db.get_value(dt, {}, 'name')

    # 3. Remaining
    print("Phase 3: Seeding Remaining...")
    all_dts = frappe.get_all('DocType', filters={'module': 'lmpharma', 'istable': 0}, fields=['name'])
    for d_row in all_dts:
        dt = d_row.name
        if dt not in level0 and dt not in level1:
            print(f"  {seed_dt(dt, master_data)}")
            
    print("Done.")

if __name__ == '__main__':
    run_seed()
