# Copyright (c) 2026, gamemarketing and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def get_doctors():
    """Get all active doctors"""
    try:
        doctors = frappe.get_all(
            "Doctor",
            fields=["name", "doctor_name", "specialization", "experience_years", "consultation_fee"],
            filters={"is_active": 1},
            order_by="doctor_name asc"
        )
        return doctors
    except Exception as e:
        frappe.log_error(f"Error getting doctors: {str(e)}")
        return []


@frappe.whitelist(allow_guest=True)
def get_doctor(doctor_name):
    """Get doctor details by name"""
    try:
        doctor = frappe.get_doc("Doctor", doctor_name)
        if not doctor:
            return {"error": "Doctor not found"}
        
        return {
            "name": doctor.name,
            "doctor_name": doctor.doctor_name,
            "specialization": doctor.specialization,
            "qualification": doctor.qualification,
            "experience_years": doctor.experience_years,
            "consultation_fee": doctor.consultation_fee,
            "email": doctor.email,
            "phone": doctor.phone,
            "available_days": doctor.available_days
        }
    except Exception as e:
        frappe.log_error(f"Error getting doctor: {str(e)}")
        return {"error": str(e)}


@frappe.whitelist()
def create_gamemarketing(doctor, gamemarketing_date, gamemarketing_time, notes=None):
    """Create a new gamemarketing"""
    try:
        # Check if user is logged in
        if not frappe.session.user or frappe.session.user == "Guest":
            return {"error": "Please login to create a gamemarketing"}
        
        # Create gamemarketing
        gamemarketing = frappe.get_doc({
            "doctype": "Gamemarketing",
            "doctor": doctor,
            "user": frappe.session.user,
            "gamemarketing_date": gamemarketing_date,
            "gamemarketing_time": gamemarketing_time,
            "notes": notes,
            "status": "Pending"
        })
        gamemarketing.insert(ignore_permissions=True)
        frappe.db.commit()
        
        return {
            "name": gamemarketing.name,
            "message": "Gamemarketing created successfully"
        }
    except Exception as e:
        frappe.log_error(f"Error creating gamemarketing: {str(e)}")
        return {"error": str(e)}


@frappe.whitelist()
def get_my_gamemarketings():
    """Get gamemarketings for current user"""
    try:
        if not frappe.session.user or frappe.session.user == "Guest":
            return {"error": "Please login to view gamemarketings"}
        
        gamemarketings = frappe.get_all(
            "Gamemarketing",
            fields=["name", "doctor", "doctor_name", "gamemarketing_date", "gamemarketing_time", "status", "notes"],
            filters={"user": frappe.session.user},
            order_by="gamemarketing_date desc, gamemarketing_time desc"
        )
        return gamemarketings
    except Exception as e:
        frappe.log_error(f"Error getting gamemarketings: {str(e)}")
        return []


@frappe.whitelist(allow_guest=True)
def get_branding():
    """Get branding information"""
    try:
        return {
            "app_name": "Gamemarketing",
            "app_logo": None,
            "favicon": None,
        }
    except Exception as e:
        return {
            "app_name": "Gamemarketing",
            "app_logo": None,
            "favicon": None,
        }


@frappe.whitelist(allow_guest=True)
def get_translations():
    """Get translations for the gamemarketing app"""
    try:
        lang = frappe.local.lang or "en"
        translations = frappe.get_all(
            "Translation",
            filters={"language": lang},
            fields=["source_text", "translated_text"]
        )
        return {t.source_text: t.translated_text for t in translations}
    except Exception as e:
        return {}


@frappe.whitelist(allow_guest=True)
def get_gamemarketing_settings():
    """Get gamemarketing app settings"""
    try:
        # Try to get from Single DocType if it exists
        if frappe.db.exists("DocType", "Gamemarketing Settings"):
            settings = frappe.get_single("Gamemarketing Settings")
            return {
                "allow_guest_access": getattr(settings, "allow_guest_access", 1),
                "disable_pwa": getattr(settings, "disable_pwa", 0),
            }
        else:
            # Return default settings
            return {
                "allow_guest_access": 1,
                "disable_pwa": 0,
            }
    except Exception:
        return {
            "allow_guest_access": 1,
            "disable_pwa": 0,
        }


@frappe.whitelist(allow_guest=True)
def get_sidebar_settings():
    """Get sidebar settings"""
    try:
        return {
            "home": 1,
            "doctors": 1,
            "my_gamemarketings": 1,
        }
    except Exception:
        return {}


@frappe.whitelist()
def get_user_info():
    """Get current user information"""
    try:
        if not frappe.session.user or frappe.session.user == "Guest":
            frappe.throw("Not authenticated", frappe.AuthenticationError)
        
        user = frappe.get_doc("User", frappe.session.user)
        return {
            "username": user.name,
            "email": user.email,
            "full_name": user.full_name,
            "user_image": user.user_image,
            "is_system_manager": "System Manager" in user.roles,
        }
    except frappe.AuthenticationError:
        raise
    except Exception as e:
        frappe.log_error(f"Error getting user info: {str(e)}")
        return {}


@frappe.whitelist()
def get_all_users():
    """Get all users"""
    try:
        users = frappe.get_all(
            "User",
            filters={"enabled": 1, "name": ["!=", "Guest"]},
            fields=["name", "full_name", "email", "user_image"]
        )
        return users
    except Exception as e:
        frappe.log_error(f"Error getting all users: {str(e)}")
        return []
