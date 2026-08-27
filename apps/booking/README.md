# Booking App - Doctor Appointment System

A Frappe-based booking application with Vue.js frontend for managing doctor appointments.

## Architecture

This app follows the same architecture as the LMS app:
- **Backend**: Frappe Framework (Python)
- **Frontend**: Vue.js 3 + Vite + TailwindCSS
- **Database**: MariaDB (via Frappe ORM)

## Features

### Core Functionality
1. **Doctor Management**
   - Create and manage doctor profiles
   - Track specialization, qualifications, experience
   - Set consultation fees
   - Manage availability

2. **Booking System**
   - Users can browse available doctors
   - Book appointments with date and time
   - Track booking status (Pending, Confirmed, Cancelled, Completed)
   - View personal booking history

## Project Structure

```
booking/
├── booking/                      # Backend (Frappe)
│   ├── booking/
│   │   ├── doctype/
│   │   │   ├── doctor/          # Doctor DocType
│   │   │   │   ├── doctor.json
│   │   │   │   └── doctor.py
│   │   │   └── booking/         # Booking DocType
│   │   │       ├── booking.json
│   │   │       └── booking.py
│   │   ├── www/
│   │   │   ├── _booking.html    # Entry point for Vue app
│   │   │   └── _booking.py
│   │   ├── api.py               # API endpoints
│   │   └── hooks.py             # App configuration
├── frontend/                     # Frontend (Vue.js)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.vue         # Landing page
│   │   │   ├── Doctors.vue      # List all doctors
│   │   │   ├── DoctorDetail.vue # Doctor details & booking form
│   │   │   └── MyBookings.vue   # User's bookings
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── router.js            # Vue Router configuration
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
```

## Installation

The app has already been created and installed. To access it:

1. **Start the bench server** (if not already running):
   ```bash
   cd /Users/mithang/Downloads/ProjectEcosystems/sys_healthcare_erpnext
   bench start
   ```

2. **Access the booking app**:
   - Main URL: http://127.0.0.1:8000/booking
   - Or from the apps menu in ERPNext

## Development

### Backend Development

1. **Add new API endpoints** in `booking/api.py`:
   ```python
   @frappe.whitelist()
   def my_new_function():
       # Your code here
       pass
   ```

2. **Create new DocTypes**:
   ```bash
   mkdir -p booking/booking/doctype/my_doctype
   # Create my_doctype.json and my_doctype.py
   ```

3. **Run migrations**:
   ```bash
   bench --site healthcare.local migrate
   ```

### Frontend Development

1. **Install dependencies** (already done):
   ```bash
   cd apps/booking/frontend
   yarn install
   ```

2. **Run development server**:
   ```bash
   yarn dev
   ```

3. **Build for production**:
   ```bash
   yarn build
   ```

4. **Add new pages**:
   - Create Vue component in `frontend/src/pages/`
   - Add route in `frontend/src/router.js`

## API Endpoints

### Public APIs (No authentication required)
- `booking.api.get_doctors()` - Get all active doctors
- `booking.api.get_doctor(doctor_name)` - Get specific doctor details

### Authenticated APIs (Login required)
- `booking.api.create_booking(doctor, booking_date, booking_time, notes)` - Create new booking
- `booking.api.get_my_bookings()` - Get current user's bookings

## Database Schema

### Doctor DocType
- `doctor_name` (Data, Unique, Required)
- `specialization` (Data, Required)
- `qualification` (Data, Required)
- `experience_years` (Int, Required)
- `consultation_fee` (Currency, Required)
- `email` (Data)
- `phone` (Data)
- `available_days` (Small Text)
- `is_active` (Check, Default: 1)

### Booking DocType
- `doctor` (Link to Doctor, Required)
- `doctor_name` (Data, fetched from doctor)
- `user` (Link to User, Default: __user)
- `booking_date` (Date, Required)
- `booking_time` (Time, Required)
- `status` (Select: Pending/Confirmed/Cancelled/Completed)
- `notes` (Small Text)

## Access URLs

- **Booking App**: http://127.0.0.1:8000/booking
- **Doctor List**: http://127.0.0.1:8000/booking/doctors
- **My Bookings**: http://127.0.0.1:8000/booking/my-bookings

## Next Steps / Enhancements

1. **Add calendar view** for doctor availability
2. **Email notifications** for booking confirmations
3. **Payment integration** for consultation fees
4. **Video consultation** integration
5. **Rating and reviews** system
6. **Admin dashboard** for managing bookings
7. **Mobile responsive** improvements
8. **Search and filter** doctors by specialization

## Troubleshooting

If you encounter issues:

1. **Clear cache**:
   ```bash
   bench clear-cache
   bench clear-website-cache
   ```

2. **Rebuild assets**:
   ```bash
   bench build --app booking
   ```

3. **Restart bench**:
   ```bash
   bench restart
   ```

## License

MIT License
