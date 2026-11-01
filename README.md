# GlowBeauty – Beauty Salon Appointment Booking System

A modern, responsive beauty salon appointment booking application built with **React, Tailwind CSS, and Supabase**. GlowBeauty provides customers with a convenient way to explore salon services, create accounts, and book appointments, while administrators can manage the booking experience.

## ✨ Features

### Customer Features

- User registration and secure login
- Forgot password and password reset functionality
- Browse available beauty services
- Book salon appointments
- Customer dashboard
- View personal appointment information

### Admin Features

- Dedicated admin dashboard
- View and manage appointment information
- Role-based access to administrative features

### General Features

- Responsive design for desktop, tablet, and mobile
- Modern and elegant beauty salon interface
- Supabase authentication and database integration
- Protected routes and role-based access
- Database security with Row Level Security (RLS)

## 🛠️ Technologies Used

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| React        | Frontend development                  |
| Tailwind CSS | Styling and responsive UI             |
| JavaScript   | Application functionality             |
| React Router | Client-side navigation                |
| Supabase     | Backend, authentication, and database |
| Vite         | Development and build tool            |
| Git & GitHub | Version control                       |

## 📁 Project Structure

```text
GlowBeauty/
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

- Create a Supabase project.
- Configure the required database tables and authentication settings.
- Set up the required Row Level Security (RLS) policies.
- Configure authentication redirect URLs for password reset functionality.

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

GlowBeauty uses Supabase authentication and Row Level Security (RLS) to help protect application data.

- Environment variables are excluded from Git using `.gitignore`.
- The `.env.example` file provides a template for required configuration.
- Supabase publishable keys are used for frontend configuration.
- Database access is controlled through RLS policies.

**Important:** Never expose Supabase secret or service-role keys in frontend code or public repositories.

## 🎯 Project Purpose

GlowBeauty was developed as a full-stack appointment booking project to demonstrate modern frontend development, backend integration, authentication, database operations, and responsive UI design.

## 👩‍💻 Developer

**WakhraWeb**

GitHub: [WakhraWeb](https://github.com/WakhraWeb)

---

_GlowBeauty – Feel beautiful. Feel confident._
