import os, json

# Use absolute path to be sure
doctype_dir = '/Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext/apps/booking/booking/booking/doctype'

actual_names = {}
for folder in os.listdir(doctype_dir):
    json_path = os.path.join(doctype_dir, folder, f"{folder}.json")
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            name = data.get('name')
            if name:
                actual_names[folder] = name

fuzzy_map = {name.replace(' ', ''): name for name in actual_names.values()}

fixed_count = 0
for folder in os.listdir(doctype_dir):
    json_path = os.path.join(doctype_dir, folder, f"{folder}.json")
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        changed = False
        # Check base fields
        for field in data.get('fields', []):
            options = field.get('options')
            if options and isinstance(options, str) and options.startswith('Hc'):
                # Normalize options for comparison
                clean_opt = options.replace(' ', '')
                if clean_opt in fuzzy_map and options != fuzzy_map[clean_opt]:
                    old_val = options
                    new_val = fuzzy_map[clean_opt]
                    print(f"Fixing mismatch in {folder}.{field.get('fieldname')}: '{old_val}' -> '{new_val}'")
                    field['options'] = new_val
                    changed = True
                    fixed_count += 1
        
        if changed:
            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=1, sort_keys=True)
                f.write('\n')

print(f"Metadata naming scan complete. Fixed {fixed_count} field options.")
