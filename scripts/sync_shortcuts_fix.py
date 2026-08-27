import json, os, sys

# Add apps to sys.path
cwd = os.getcwd()
sys.path.extend([
    os.path.join(cwd, 'apps/frappe'),
    os.path.join(cwd, 'apps/erpnext'),
    os.path.join(cwd, 'apps/booking')
])

import frappe
from frappe.utils.logger import get_logger

# Prevent logging error
def dummy_logger(*args, **kwargs):
    import logging
    return logging.getLogger("dummy")
frappe.logger = dummy_logger

def run():
    frappe.init(site='healthcare.local', sites_path='sites')
    frappe.connect()
    
    doctype_path = 'apps/booking/booking/doctype'
    doctypes = [d for d in os.listdir(doctype_path) if os.path.isdir(os.path.join(doctype_path, d)) and not d.startswith('__')]

    categories = {'Core Operations': [], 'Staff & Payroll': [], 'Configurations': [], 'Masters': []}

    def categorize(name):
        n = name.lower()
        if any(k in n for k in ['order', 'booking', 'payment', 'transact', 'chat', 'message', 'voucher', 'sales', 'transaction']): return 'Core Operations'
        if any(k in n for k in ['staff', 'salary', 'payroll', 'shift', 'income', 'off', 'skill', 'turn', 'job']): return 'Staff & Payroll'
        if any(k in n for k in ['config', 'setting', 'theme', 'variable', 'sms', 'ui', 'web', 'app', 'hook', 'log', 'permission', 'field']): return 'Configurations'
        return 'Masters'

    for dt in doctypes:
        json_f = os.path.join(doctype_path, dt, f'{dt}.json')
        if os.path.exists(json_f):
            data = json.load(open(json_f))
            if 'name' in data:
                categories[categorize(data['name'])].append(data['name'])

    for cat in categories: categories[cat].sort()

    shortcuts = []
    for cat in categories:
        for dt_name in categories[cat]:
            shortcuts.append({'label': dt_name, 'link_to': dt_name, 'type': 'DocType'})

    content = [{'id':'chart_1','type':'chart','data':{'chart_name':'Orders by Day','col':12}}, {'id':'spacer_init','type':'spacer','data':{'col':12}}]
    id_counter = 0
    for cat_name, dt_list in categories.items():
        if not dt_list: continue
        id_counter += 1
        content.append({'id': f'header_{id_counter}', 'type': 'header', 'data': {'text': f'<span class="h4"><b>{cat_name}</b></span>', 'col': 12}})
        for dt_name in dt_list:
            id_counter += 1
            content.append({'id': f'sc_{id_counter}', 'type': 'shortcut', 'data': {'shortcut_name': dt_name, 'label': dt_name, 'col': 3}})
        id_counter += 1
        content.append({'id': f'spacer_{id_counter}', 'type': 'spacer', 'data': {'col': 12}})

    # Update booking.json
    path = 'apps/booking/booking/workspace/booking/booking.json'
    if os.path.exists(path):
        with open(path, 'r') as f:
            ws_json = json.load(f)
        ws_json['shortcuts'] = shortcuts
        ws_json['content'] = json.dumps(content)
        with open(path, 'w') as f:
            json.dump(ws_json, f, indent=1, sort_keys=True)

    # Sync to DB
    frappe.db.delete('Workspace Shortcut', {'parent': 'Booking'})
    for sc in shortcuts:
        sc_doc = frappe.get_doc({'doctype': 'Workspace Shortcut', 'parent': 'Booking', 'parenttype': 'Workspace', 'parentfield': 'shortcuts', **sc})
        sc_doc.insert(ignore_permissions=True, ignore_links=True)

    frappe.db.set_value('Workspace', 'Booking', 'content', json.dumps(content))
    frappe.db.commit()
    print('Workspace Mapping Successful')

if __name__ == '__main__':
    run()
