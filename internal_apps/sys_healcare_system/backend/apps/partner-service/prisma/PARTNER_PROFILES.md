# Partner Profiles Schema Documentation

## Overview
This document describes the complete database schema for partner profiles in the healthcare system, including enhanced models for doctors, clinics, hospitals, pharmacies, pharmacists, patients, and new entities for pharmaceutical companies and international pharma groups.

## Entity Relationship Diagram (Text)

```
User (user-service) 
    │
    ├── Doctor ──────┐
    ├── Patient      │
    ├── Pharmacist ──┤
    └── Staff        │
                     │
Hospital ────────────┤
    │                │
    └── Doctor ──────┘
        │
Clinic ─┤
    │   │
    └───┤
        │
Pharmacy ────────── Pharmacist
    │
    ├── PharmaceuticalCompany
    └── InternationalPharmaGroup
```

---

## 1. Doctor Profile
Represents a medical doctor registered on the platform.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Full name |
| specialty | String | Medical specialty |
| hospital | String? | Hospital name (legacy) |
| hospitalId | Int? | Reference to Hospital |
| clinicId | Int? | Reference to Clinic |
| phone | String | Contact phone |
| email | String? | Email address |
| description | String? | Professional description |
| rating | Float? | Average rating |
| ratingCount | Int | Number of ratings |
| isVerified | Boolean | Verification status |
| status | String | Enum: pending, active, rejected, suspended |
| rejectionReason | String? | Reason for rejection |
| thumbnail | String? | Profile image URL |
| degree | String? | Academic degree |
| expYears | Int | Years of experience |
| associationAward | String? | Professional awards |
| services | Json? | List of services offered |
| worktime | Json? | Working schedule |
| gallery | String[] | Image gallery |
| intro | String? | Short introduction |
| ratingData | Json? | Rating breakdown |
| qaData | Json? | Q&A data |
| articlesData | Json? | Published articles data |
| address | String? | Full address |
| **dob** | DateTime? | Date of birth |
| **gender** | String? | Gender |
| **nationalId** | String? | CMND/CCCD number |
| **licenseNumber** | String? | Medical practice license number |
| **licenseImage** | String? | License image URL |
| **certificateImage** | String? | Certificate image URL |
| **price** | Float? | Consultation price |
| **consultationFee** | Float? | Online consultation fee |
| **isOnlineConsultation** | Boolean | Whether online consultation is available |
| **languages** | String[] | Languages spoken |
| **education** | Json? | Education history |
| **experience** | Json? | Work experience |
| **socialLinks** | Json? | Social media links |
| **bankInfo** | Json? | Bank account info |
| **insuranceAccepted** | String[] | Accepted insurance providers |
| **tags** | String[] | Search tags |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### Relations
- belongsTo Hospital (hospitalRel)
- belongsTo Clinic (clinicRel)

---

## 2. Clinic Profile
Represents a medical clinic.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Clinic name |
| address | String | Full address |
| phone | String | Contact phone |
| email | String? | Email address |
| description | String? | Description |
| specialties | String[] | Medical specialties |
| rating | Float? | Average rating |
| ratingCount | Int | Number of ratings |
| isVerified | Boolean | Verification status |
| status | String | Enum: pending, active, rejected, suspended |
| rejectionReason | String? | Reason for rejection |
| thumbnail | String? | Thumbnail image URL |
| degree | String? | Academic degree level |
| associationAward | String? | Awards |
| services | Json? | Services offered |
| worktime | Json? | Working hours |
| gallery | String[] | Image gallery |
| intro | String? | Introduction |
| ratingData | Json? | Rating breakdown |
| qaData | Json? | Q&A data |
| articlesData | Json? | Articles data |
| **licenseNumber** | String? | Business license number |
| **licenseImage** | String? | License image URL |
| **taxCode** | String? | Tax code |
| **emergencyContact** | String? | Emergency contact |
| **facilities** | Json? | Facilities information |
| **insuranceAccepted** | String[] | Accepted insurance providers |
| **acceptedPaymentMethods** | String[] | Accepted payment methods |
| **socialLinks** | Json? | Social media links |
| **bankInfo** | Json? | Bank account info |
| **logo** | String? | Logo URL |
| **coverImage** | String? | Cover image URL |
| **is24h** | Boolean | 24-hour operation |
| **provinceCode** | String? | Province code |
| **districtCode** | String? | District code |
| **wardCode** | String? | Ward code |
| **streetName** | String? | Street name |
| **latitude** | Float? | Latitude coordinate |
| **longitude** | Float? | Longitude coordinate |

### Relations
- hasMany Doctor (doctors)

---

## 3. Hospital Profile
Represents a hospital.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Hospital name |
| address | String | Address |
| phone | String | Contact phone |
| **hospitalCode** | String? | Hospital code (ma benh vien) |
| **hospitalLevel** | String? | Level: Trung uong, tinh, huyen, xa |
| **hospitalType** | String? | Type: Cong lap, tu nhan, chuyen khoa |
| licenseNumber | String? | Business license |
| **taxCode** | String? | Tax code |
| **emergencyPhone** | String? | Emergency hotline |
| **totalDoctors** | Int | Number of doctors |
| **totalNurses** | Int | Number of nurses |
| **totalStaff** | Int | Total staff |
| **acceptedInsurance** | String[] | Accepted insurance types |
| **equipment** | Json? | Medical equipment |
| **awards** | Json? | Hospital awards |
| **accreditation** | Json? | Accreditation info |
| **yearEstablished** | Int? | Year established |
| **provinceCode** | String? | Province code |
| **districtCode** | String? | District code |
| **wardCode** | String? | Ward code |
| **streetName** | String? | Street name |
| **latitude** | Float? | Latitude |
| **longitude** | Float? | Longitude |

### Relations
- hasMany Doctor (doctors)

---

## 4. Pharmacy Profile
Represents a pharmacy.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Pharmacy name |
| address | String | Address |
| phone | String | Contact phone |
| rating | Float? | Average rating |
| isVerified | Boolean | Verification status |
| status | String | Enum: pending, active, rejected, suspended |
| **licenseNumber** | String? | Business license number |
| **licenseImage** | String? | License image URL |
| **taxCode** | String? | Tax code |
| **pharmacyType** | String? | Type: Nha thuoc, Quay thuoc |
| **is24h** | Boolean | 24-hour operation |
| **deliveryAvailable** | Boolean | Delivery service available |
| **deliveryRadius** | Float? | Delivery radius (km) |
| **insuranceAccepted** | String[] | Accepted insurance |
| **acceptedPaymentMethods** | String[] | Accepted payment methods |
| **hasPharmacistOnDuty** | Boolean | Pharmacist on duty |
| **isChainStore** | Boolean | Whether part of a chain |
| **chainName** | String? | Chain store name |
| **bankInfo** | Json? | Bank account info |
| **businessHours** | Json? | Structured business hours |
| **latitude** | Float? | Latitude |
| **longitude** | Float? | Longitude |

### Relations
- hasMany Pharmacist (pharmacists)

---

## 5. Pharmacist Profile
Represents a licensed pharmacist.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| fullName | String | Full name |
| phoneNumber | String | Phone number |
| address | String | Address |
| **dob** | DateTime? | Date of birth |
| **gender** | String? | Gender |
| **nationalId** | String? | CMND/CCCD number |
| **licenseNumber** | String? | Pharmacy practice license number |
| **licenseImage** | String? | License image URL |
| **pharmacyId** | Int? | Reference to Pharmacy |
| **workplaceName** | String? | Workplace name |
| **education** | Json? | Education details |
| **experience** | Json? | Work experience |
| **languages** | String[] | Languages spoken |
| **consultationFee** | Float? | Consultation fee |
| **isOnlineConsultation** | Boolean | Online consultation available |
| **certifications** | Json? | Professional certifications |

### Relations
- belongsTo Pharmacy (pharmacyRel)

---

## 6. Patient Profile
Represents a patient/user of the platform.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| patientId | String (unique) | Patient UUID |
| name | String | Full name |
| **fullName** | String? | Formal full name |
| **dob** | DateTime? | Date of birth |
| gender | String? | Gender |
| **nationalId** | String? | CMND/CCCD number |
| phone | String | Contact phone |
| email | String? | Email address |
| **address** | String? | Full address |
| **provinceCode** | String? | Province code |
| **districtCode** | String? | District code |
| **wardCode** | String? | Ward code |
| **streetName** | String? | Street name |
| **bloodType** | String? | Blood type (A, B, AB, O) |
| **allergies** | String[] | Known allergies |
| **medicalHistory** | Json? | Medical history records |
| **emergencyContact** | Json? | Emergency contact info |
| **insuranceInfo** | Json? | Health insurance info |
| **avatar** | String? | Avatar URL |
| **occupation** | String? | Occupation |
| **height** | Float? | Height (cm) |
| **weight** | Float? | Weight (kg) |
| **lastMenstruation** | DateTime? | Last menstruation date |
| **isPregnant** | Boolean | Pregnancy status |
| **chronicDiseases** | String[] | Chronic diseases |
| **currentMedications** | String[] | Current medications |
| **smoking** | Boolean? | Smoking habit |
| **alcohol** | Boolean? | Alcohol consumption |
| **exerciseFrequency** | String? | Exercise frequency |
| **familyHistory** | Json? | Family medical history |
| **surgicalHistory** | Json? | Surgical history |
| **vaccinationHistory** | Json? | Vaccination records |
| **preferredLanguage** | String? | Preferred language |
| status | String | Enum: active, inactive, blocked |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

## 7. PharmaceuticalCompany (Mới - Công ty Dược)

Represents a domestic pharmaceutical company.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Company name |
| companyCode | String (unique) | Company code |
| taxCode | String? | Tax code |
| address | String | Headquarters address |
| phone | String | Contact phone |
| email | String? | Email |
| website | String? | Website URL |
| companyType | String? | Type: San xuat, Phan phoi, Nhap khau, Xuat khau |
| licenseNumber | String? | Business license |
| licenseImage | String? | License image |
| representativeName | String? | Representative name |
| representativePhone | String? | Representative phone |
| representativeEmail | String? | Representative email |
| isVerified | Boolean | Verification status |
| status | String | Enum: pending, active, rejected, suspended |
| rating | Float? | Rating |
| reviewCount | Int | Review count |
| logo | String? | Logo URL |
| coverImage | String? | Cover image |
| description | String? | Company description |
| products | String[] | Product list |
| certifications | Json? | Certifications |
| bankInfo | Json? | Banking info |
| socialLinks | Json? | Social media |
| yearEstablished | Int? | Year founded |
| country | String | Country (default: Vietnam) |

### Indexes
- name, status, companyCode, companyType, country

---

## 8. InternationalPharmaGroup (Mới - Tập đoàn Dược Đa quốc gia)

Represents a multinational/international pharmaceutical corporation.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| name | String | Group name |
| groupCode | String (unique) | Group code |
| headquarters | String | Global headquarters location |
| country | String | Country of origin |
| region | String? | Region: chau A, chau Au, chau My |
| representativeOffice | String? | Vietnam representative office address |
| localPartner | String? | Local partner in Vietnam |
| licenseNumber | String? | Business license in Vietnam |
| licenseImage | String? | License image |
| isVerified | Boolean | Verification status |
| status | String | Enum: pending, active, rejected |
| logo | String? | Logo |
| coverImage | String? | Cover image |
| description | String? | Description |
| productCategories | String[] | Product categories |
| certifications | Json? | International certifications |
| bankInfo | Json? | Banking info |
| yearEstablished | Int? | Year founded |
| vatNumber | String? | VAT number |
| importLicenseNumber | String? | Import license number |
| website | String? | Website |
| email | String? | Email |
| phone | String? | Phone |

### Indexes
- name, status, groupCode, country, region

---

## 9. Region (Mới - Khu vực địa lý)

Represents a geographical region for organizing healthcare partners.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK, auto) | Unique identifier |
| code | String (unique) | Region code |
| name | String | Region name (Vietnamese) |
| nameEn | String? | Region name (English) |
| type | String? | Type: Mien Bac, Mien Trung, Mien Nam, Quoc te |
| description | String? | Description |
| provinces | String[] | List of province codes in this region |

### Indexes
- name, code, type

---

## Usage Guidelines

### For API Development
1. All new fields are optional (marked with ?) to maintain backward compatibility
2. Use `status` field with enum values: `pending`, `active`, `rejected`, `suspended`
3. Use `isVerified` for KYC verification status
4. Use `rating` and `reviewCount` for reputation system
5. Use `services` (Json) for flexible service definitions

### For Frontend Development
1. Display `degree` and `expYears` prominently on doctor/hospital cards
2. Show verification badge (`isVerified`) on all profiles
3. Use `gallery`, `thumbnail`, `logo`, `coverImage` for visual presentation
4. Parse `worktime` Json for business hours display
5. Use `ratingData` Json for breakdown visualization (stars, counts per score)

### For Search Implementation
1. Full-text search indexes: name, description, specialties
2. Filter by: status, specialty, isVerified, rating
3. Geo-search: latitude, longitude fields available for location-based queries
4. Tags field available for custom search keywords

### For Compliance
1. `licenseNumber` and `licenseImage` store regulatory license info
2. `nationalId` stores government ID for identity verification
3. `bankInfo` stores payment details for transactions
4. All models include createdAt/updatedAt for audit trail
