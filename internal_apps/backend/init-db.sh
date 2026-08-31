#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE auth_db;
    CREATE DATABASE user_db;
    CREATE DATABASE partner_db;
    CREATE DATABASE content_db;
    CREATE DATABASE booking_db;
    CREATE DATABASE search_db;
    CREATE DATABASE setting_db;
    CREATE DATABASE file_db;
    CREATE DATABASE notification_db;
    CREATE DATABASE erp_db;
    CREATE DATABASE audit_log_db;
    CREATE DATABASE payment_db;
    CREATE DATABASE backgroundjob_db;
    CREATE DATABASE community_db;
    CREATE DATABASE education_db;
    CREATE DATABASE marketing_db;
    CREATE DATABASE finance_db;
    CREATE DATABASE seminar_db;
    CREATE DATABASE report_db;
    CREATE DATABASE survey_db;
    CREATE DATABASE ai_db;
    CREATE DATABASE analytic_db;
    CREATE DATABASE engagement_db;
    CREATE DATABASE gamification_db;
    CREATE DATABASE live_db;
    CREATE DATABASE shop_db;
    CREATE DATABASE jobs_db;
EOSQL
