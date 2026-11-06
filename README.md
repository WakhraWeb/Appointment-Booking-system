# GlowBeauty – Beauty Salon Appointment Booking System

A modern, responsive beauty salon appointment booking application built with **React, Tailwind CSS, and Supabase**.

GlowBeauty allows customers to explore beauty services, create accounts, and request appointments. Administrators can manage bookings through a dedicated dashboard.

## ✨ Features

### Customer Features

- User registration and secure login
- Forgot password and password reset functionality
- Browse available beauty services
- Book salon appointments
- View personal appointments in a customer dashboard
- View appointment status updates

### Admin Features

- Dedicated admin dashboard
- View all customer appointments
- Confirm or cancel appointment requests
- Manage appointment statuses
- Role-based access to administrative features

### Booking System

- Service, date, and time selection
- Supabase Edge Function for booking submission
- Database-level double-booking prevention
- Prevents multiple active appointments for the same date and time
- Clear error message when a time slot is already booked
- Appointment timezone stored as `Asia/Karachi`

### General Features

- Responsive design for desktop, tablet, and mobile
- Modern beauty salon interface
- Supabase authentication and database integration
- Protected routes and role-based access
- Row Level Security (RLS) policies

## 🛠️ Technologies Used

| Technology              | Purpose                               |
| ----------------------- | ------------------------------------- |
| React                   | Frontend development                  |
| Tailwind CSS            | Styling and responsive UI             |
| JavaScript              | Application functionality             |
| React Router            | Client-side navigation                |
| Supabase                | Authentication, database, and backend |
| Supabase Edge Functions | Secure booking operations             |
| PostgreSQL              | Database and booking constraints      |
| Vite                    | Development and build tool            |
| Git & GitHub            | Version control                       |

## 📁 Project Structure

```text
Appointment-Booking-system/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── supabase/
│   └── functions/
│       └── create-booking/
│           └── index.ts
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run GlowBeauty locally.

### 1. Clone the Repository

```bash
git clone https://github.com/WakhraWeb/Appointment-Booking-system.git
```

### 2. Navigate to the Project

```bash
cd Appointment-Booking-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your own Supabase project credentials.

### 5. Configure Supabase

To enable the backend functionality:

- Create a Supabase project.
- Configure the required database tables and columns.
- Enable and configure Row Level Security (RLS) policies.
- Configure Supabase Authentication.
- Set up authentication redirect URLs for password reset functionality.
- Deploy the `create-booking` Edge Function.
- Configure the required Edge Function secrets securely in Supabase.

The booking function uses the Supabase service-role key on the server side. Never expose this key in frontend code.

### 6. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

### 7. Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## 🔐 Security

GlowBeauty uses Supabase Authentication and Row Level Security (RLS) to help protect application data.

- Environment variables are excluded from Git using `.gitignore`.
- `.env.example` provides a template for required configuration.
- Supabase publishable keys are used for frontend configuration.
- Database access is controlled through RLS policies.
- Admin and customer access is managed through user roles.
- Booking operations are handled through a Supabase Edge Function.

**Important:** Never expose Supabase secret or service-role keys in frontend code or public repositories.

## 🕒 Booking Timezone

GlowBeauty's demo booking system uses the `Asia/Karachi` timezone.

The appointment timezone is stored alongside each booking in the database. This demo currently uses a fixed timezone and does not implement automatic multi-timezone conversion.

## 🎯 Project Purpose

GlowBeauty was developed as a full-stack appointment booking project to demonstrate:

- Modern React frontend development
- Responsive UI design with Tailwind CSS
- Authentication and protected routes
- Supabase database integration
- Server-side booking operations
- Database-level double-booking prevention
- Customer and admin dashboard functionality

## 👩‍💻 Developer

**WakhraWeb**

GitHub: [WakhraWeb](https://github.com/WakhraWeb)

---

_GlowBeauty – Feel beautiful. Feel confident._
