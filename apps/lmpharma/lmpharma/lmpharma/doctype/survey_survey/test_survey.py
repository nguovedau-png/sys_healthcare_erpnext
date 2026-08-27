# Copyright (c) 2026, Minh.Tran and contributors
# For license information, please see license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestSurvey(FrappeTestCase):
	def setUp(self):
		"""Set up test data"""
		self.survey_survey_data = {
			"doctype": "SurveySurvey",
			"title": "Customer Satisfaction SurveySurvey 2026",
			"description": "Annual customer satisfaction survey_survey",
			"status": "DRAFT"
		}
	
	def test_create_survey_survey(self):
		"""Test creating a survey_survey"""
		survey_survey = frappe.get_doc(self.survey_survey_data)
		survey_survey.insert()
		self.assertEqual(survey_survey.title, "Customer Satisfaction SurveySurvey 2026")
		self.assertEqual(survey_survey.status, "DRAFT")
		self.assertIsNotNone(survey_survey.name)
		
	def test_update_survey_survey(self):
		"""Test updating a survey_survey"""
		survey_survey = frappe.get_doc(self.survey_survey_data)
		survey_survey.insert()
		
		# Update survey_survey
		survey_survey.status = "ACTIVE"
		survey_survey.description = "Updated description"
		survey_survey.save()
		
		updated_survey_survey = frappe.get_doc("SurveySurvey", survey_survey.name)
		self.assertEqual(updated_survey_survey.status, "ACTIVE")
		self.assertEqual(updated_survey_survey.description, "Updated description")
		
	def test_delete_survey_survey(self):
		"""Test deleting a survey_survey"""
		survey_survey = frappe.get_doc(self.survey_survey_data)
		survey_survey.insert()
		survey_survey_name = survey_survey.name
		
		# Delete survey_survey
		frappe.delete_doc("SurveySurvey", survey_survey_name)
		
		# Verify deletion
		self.assertFalse(frappe.db.exists("SurveySurvey", survey_survey_name))
		
	def test_survey_survey_with_questions(self):
		"""Test survey_survey with child questions"""
		survey_survey = frappe.get_doc({
			"doctype": "SurveySurvey",
			"title": "Product Feedback SurveySurvey",
			"description": "Collect product feedback",
			"status": "ACTIVE",
			"questions": [
				{
					"doctype": "Edu Question",
					"content": "How satisfied are you with our product?",
					"type": "RATING",
					"required": 1,
					"order": 1
				},
				{
					"doctype": "Edu Question",
					"content": "What features do you use most?",
					"type": "MULTIPLE_CHOICE",
					"required": 1,
					"order": 2,
					"options": [
						{"doctype": "Survey Question Option", "content": "Feature A", "order": 1},
						{"doctype": "Survey Question Option", "content": "Feature B", "order": 2},
						{"doctype": "Survey Question Option", "content": "Feature C", "order": 3}
					]
				}
			]
		})
		survey_survey.insert()
		
		self.assertEqual(len(survey_survey.questions), 2)
		self.assertEqual(survey_survey.questions[0].type, "RATING")
		self.assertEqual(len(survey_survey.questions[1].options), 3)
		
	def test_list_survey_surveys(self):
		"""Test listing survey_surveys"""
		# Create multiple survey_surveys
		for i in range(3):
			survey_survey = frappe.get_doc({
				"doctype": "SurveySurvey",
				"title": f"Test SurveySurvey {i}",
				"status": "DRAFT"
			})
			survey_survey.insert()
			
		# Get all survey_surveys
		survey_surveys = frappe.get_all("SurveySurvey", fields=["name", "title", "status"])
		self.assertGreaterEqual(len(survey_surveys), 3)
