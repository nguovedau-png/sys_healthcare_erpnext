import frappe

def run():
    apps = ['surveys', 'news', 'liveconference', 'jobs', 'forums', 'educations']
    for app in apps:
        frappe.db.delete("Installed App", {"name": app})
    frappe.db.commit()
    print("Cleaned up missing apps from database.")

if __name__ == "__main__":
    run()
