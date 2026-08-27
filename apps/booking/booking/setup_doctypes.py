import os
import re
import frappe

MODULE_DIR = "/Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/modules"

def to_snake_case(name):
    # e.g. ChatMessage -> chat_message
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def to_title_case(snake_str):
    components = snake_str.split('_')
    return " ".join(x.title() for x in components)

def parse_all_schemas():
    files = []
    for root, _, filenames in os.walk(MODULE_DIR):
        for f in filenames:
            if f.endswith('.schema.ts'):
                files.append(os.path.join(root, f))
    
    classes = {}
    
    class_pattern = re.compile(r'class\s+(\w+)(.*?)\{([^}]+)\}', re.DOTALL)
    prop_pattern = re.compile(r'(?:@Prop\([^)]*\)\s*(?:@[A-Za-z0-9_\(\)\{\}\[\]"\'\s:]*\s*)*)?\s*(\w+)\??\s*:\s*([^;\n]+);', re.MULTILINE)
    
    for filepath in files:
        with open(filepath, 'r') as f:
            content = f.read()
            
        matches = class_pattern.findall(content)
        for class_name, extends_part, body in matches:
            is_base = 'BaseEntity' in extends_part
            fields = []
            
            # Simple field extraction: find all propertyName: type;
            # but only if they don't look like function signatures
            lines = body.split('\n')
            
            for line in lines:
                line = line.strip()
                if not line or line.startswith('//') or line.startswith('@'):
                    continue
                # Try match propertyName: Type;
                m = re.match(r'^(\w+)\??\s*:\s*([^;]+);', line)
                if m:
                    fields.append({
                        'name': m.group(1),
                        'type': m.group(2).strip()
                    })
                    
            classes[class_name] = {
                'is_base': is_base,
                'fields': fields,
                'file': filepath
            }
            
    return classes

def map_type(ts_type, class_name, all_classes):
    ts_type = ts_type.strip()
    if ts_type in ('string', 'String'):
        return 'Data', None
    if ts_type in ('number', 'Number'):
        return 'Float', None
    if ts_type in ('boolean', 'Boolean'):
        return 'Check', None
    if ts_type in ('Date',):
        return 'Datetime', None
    if ts_type.endswith('[]'):
        inner_type = ts_type[:-2].strip()
        if inner_type in ('string', 'number'):
            return 'Text', None
        if inner_type in all_classes:
            return 'Table', inner_type
    
    if ts_type.startswith('Types.ObjectId'):
        return 'Data', None # fallback
        
    # maybe entity ref
    if ts_type in all_classes:
        return 'Link', ts_type
        
    return 'Data', None

def create_doctype(class_name, meta, all_classes):
    doctype_name = class_name
    
    if frappe.db.exists('DocType', doctype_name):
        doc = frappe.get_doc('DocType', doctype_name)
        doc.fields = []
    else:
        doc = frappe.new_doc('DocType')
        doc.name = doctype_name
        
    is_child = not meta['is_base']
    
    fields = []
    
    for idx, f in enumerate(meta['fields']):
        fname = to_snake_case(f['name'])
        ftype, foptions = map_type(f['type'], doctype_name, all_classes)
        
        fieldname = fname
        if fieldname in ('name', 'owner', 'creation', 'modified', 'modified_by', 'idx', 'docstatus'):
            fieldname = fieldname + "_custom"
            
        fields.append({
            'fieldname': fieldname[:30], # max length
            'label': to_title_case(fname),
            'fieldtype': ftype,
            'options': foptions,
            'in_list_view': 1 if idx < 4 else 0
        })
        
    doc.update({
        'doctype': 'DocType',
        'name': doctype_name,
        'module': 'Booking',
        'custom': 0,
        'istable': 1 if is_child else 0,
        'permissions': [{'role': 'System Manager', 'read': 1, 'write': 1, 'create': 1, 'delete': 1}] if not is_child else []
    })
    
    for f in fields:
        doc.append('fields', f)
    
    try:
        if doc.is_new():
            doc.insert(ignore_permissions=True)
            print(f"Created DocType {doctype_name}")
        else:
            doc.save(ignore_permissions=True)
            print(f"Updated DocType {doctype_name}")
        frappe.db.commit()
    except Exception as e:
        print(f"Failed to create {doctype_name}: {str(e)}")

def execute():
    frappe.session.user = "Administrator"
    classes = parse_all_schemas()
    
    # Create child tables first
    for name, meta in classes.items():
        if not meta['is_base']:
            create_doctype(name, meta, classes)
            
    # Create main tables
    for name, meta in classes.items():
        if meta['is_base']:
            create_doctype(name, meta, classes)

    print(f"Extraction and generation complete. Found {len(classes)} schema entities.")

if __name__ == "__main__":
    frappe.init(site='healthcare.local', sites_path='/Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/sites')
    frappe.connect()
    execute()
