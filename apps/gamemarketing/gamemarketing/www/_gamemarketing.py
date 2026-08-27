import frappe

no_cache = 1


def get_context():
    context = frappe._dict()
    context.boot = get_boot()
    frappe.db.commit()
    
    return context


def get_boot():
    return frappe._dict(
        {
            "frappe_version": frappe.__version__,
            "read_only_mode": frappe.flags.read_only,
            "csrf_token": frappe.sessions.get_csrf_token(),
            "site_name": frappe.local.site,
        }
    )
