<<<<<<< HEAD
# heart-harmony-hub-47-main
the project describes about a matching profile
=======
# ❤️ Saath — Matrimonial Web Application

## 📌 Project Overview

**Saath** is a modern matrimonial web application designed to help users find their life partners. It provides secure authentication, profile management, and user interaction features in a responsive and user-friendly interface.

---

## 🚀 Features

### 🔐 Authentication

* Email & Password Signup/Login
* Mobile OTP Login (SMS आधारित authentication)
* Email Verification
* Forgot Password & Reset Password

### 👤 User Profile

* Create & Update Profile
* Store user details (Name, Gender, DOB, Phone)
* Profile viewing system

### 🛡️ Security

* Protected Routes
* Session Management
* Secure authentication using Supabase

### 👨‍💼 Admin Panel

* View all registered users
* Access user profile data
* Admin-only access control

### 💬 Additional Features

* Browse profiles
* Shortlist profiles
* Interests & messaging (basic structure)
* Responsive UI (Mobile, Tablet, Desktop)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS

### Backend / Database

* Supabase (PostgreSQL)

### Other Tools

* Vite
* React Router
* TanStack Query

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 │    ├── Auth.tsx
 │    ├── ForgotPassword.tsx
 │    ├── ResetPassword.tsx
 │    ├── Browse.tsx
 │    ├── Admin.tsx
 │    └── ...
 ├── integrations/
 ├── lib/
 └── App.tsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd project-folder
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Run Project

```
npm run dev
```

Open in browser:

```
http://localhost:8080
```

---

## 🔑 Environment Variables

Create `.env` file and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🧪 How to Use

1. Open the app
2. Create a new account
3. Verify email (if enabled)
4. Complete profile
5. Browse profiles
6. Admin can view all users

---

## 🌐 Deployment

This project can be deployed using:

* Vercel (Recommended)
* Netlify

After deployment, it will work on:

* Mobile 📱
* Laptop 💻
* Tablet

---

## 📈 Future Improvements

* Profile image upload
* Advanced search filters
* Chat system enhancement
* Match recommendation system

---

## 👨‍🎓 Author

**Narendra Gupta**
B.Tech Student — Vignan University

---

## 📜 License

This project is developed for educational and demonstration purposes.


>>>>>>> 562a1e2 (first commit)
