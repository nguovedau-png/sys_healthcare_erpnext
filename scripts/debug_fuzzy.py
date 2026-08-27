import os, json
doctype_dir = 'apps/booking/booking/booking/doctype'
actual_names = {}
for folder in os.listdir(doctype_dir):
    json_path = os.path.join(doctype_dir, folder, f"{folder}.json")
    if os.path.exists(json_path):
        with open(json_path, 'r') as f:
            data = json.load(f)
            name = data.get('name')
            actual_names[folder] = name
fuzzy_map = {name.replace(' ', ''): name for name in actual_names.values()}
print(f"Fuzzy Map Sample: {list(fuzzy_map.items())[:10]}")
print(f"Is 'HcOrderItem' in fuzzy_map? {'HcOrderItem' in fuzzy_map}")
if 'HcOrderItem' in fuzzy_map:
    print(f"Mapping: HcOrderItem -> {fuzzy_map['HcOrderItem']}")
