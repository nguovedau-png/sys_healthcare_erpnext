import os, json

doctype_dir = 'apps/booking/booking/booking/doctype'

# 1. Collect all actual DocType names from their JSON files
actual_names = {} # filename_root -> actual_name
for folder in os.listdir(doctype_dir):
    json_path = os.path.join(doctype_dir, folder, f"{folder}.json")
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
            actual_names[folder] = data.get('name')

print(f"Collected {len(actual_names)} actual DocType names.")

# 2. Create a map of "NameWithoutSpaces" -> "Actual Name with Spaces"
# This helps resolve typos like HcOrderItem -> Hc Order Item
fuzzy_map = {name.replace(' ', ''): name for name in actual_names.values()}

# 3. Scan all JSON files for 'options' that match the fuzzy map but are missing spaces
fixed_count = 0
for folder in os.listdir(doctype_dir):
    json_path = os.path.join(doctype_dir, folder, f"{folder}.json")
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        changed = False
        for field in data.get('fields', []):
            options = field.get('options')
            if options and options.startswith('Hc'):
                # Check if it matches a fuzzy name but is not the exact name
                if options in fuzzy_map and options != fuzzy_map[options]:
                    old_val = options
                    new_val = fuzzy_map[options]
                    print(f"Fixing mismatch in {folder}: {old_val} -> {new_val}")
                    field['options'] = new_val
                    changed = True
                    fixed_count += 1
        
        if changed:
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=1, sort_keys=True)
                # Ensure a newline at the end for Frappe consistency
                f.write('\n')

print(f"Metadata naming scan complete. Fixed {fixed_count} field options.")

