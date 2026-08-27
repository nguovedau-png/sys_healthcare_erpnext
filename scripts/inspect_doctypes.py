import frappe

def run():
    apps = ["educations", "forums", "jobs", "news", "surveys"]
    for app in apps:
        print(f"--- App: {app} ---")
        module_name = app.capitalize()
        doctypes = frappe.get_all("DocType", filters={"module": module_name}, fields=["name"])
        for dt in doctypes:
            print(f"DocType: {dt.name}")
            meta = frappe.get_meta(dt.name)
            fields = [f.fieldname for f in meta.fields if not f.no_copy]
            print(f"Fields: {fields}")
            print("")

if __name__ == "__main__":
    run()
