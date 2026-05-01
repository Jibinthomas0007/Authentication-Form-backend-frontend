# 🔐 Full-Stack Authentication System (Laravel + React + JWT)

A production-style authentication system built using **Laravel (Backend API)** and **React + Redux Toolkit (Frontend)** with **JWT-based authentication**, role-based access control, and automatic token refresh.

---

## 🚀 Features

### 🔑 Authentication

* User Registration (Email / Phone)
* Secure Login with JWT
* Logout functionality
* Get authenticated user (`/me`)
* Token Refresh (Auto handled in frontend)

### 🔒 Security

* JWT Authentication (Short-lived access tokens)
* Auto token refresh system
* Protected API routes
* Role-based access control (Admin / User)

### 👑 Authorization

* Admin-only routes using custom middleware
* User dashboard vs Admin dashboard separation

### ⚛️ Frontend

* React with Vite
* Redux Toolkit for state management
* Axios API service with interceptors
* Auto attach JWT token
* Auto refresh expired tokens

---

## 🏗️ Project Structure

```
php-project/
├── backend/        # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └── Models/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── config/
│
├── frontend/       # React App
│   ├── src/
│   │   ├── features/
│   │   ├── services/
│   │   ├── pages/
│   │   └── components/
│   └── package.json
```

---

## ⚙️ Tech Stack

### Backend

* PHP (Laravel)
* JWT Auth
* MySQL

### Frontend

* React (Vite)
* Redux Toolkit
* Axios

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd php-project
```

---

## 🖥️ Backend Setup (Laravel)

```bash
cd backend

composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

### Configure `.env`

```env
DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=

JWT_TTL=15
JWT_REFRESH_TTL=20160
```

### Run migrations

```bash
php artisan migrate
```

### Start backend server

```bash
php artisan serve
```

👉 Runs on: `http://127.0.0.1:8000`

---

## 🌐 Frontend Setup (React)

```bash
cd frontend

npm install
npm run dev
```

👉 Runs on: `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/api/register` | Register user          |
| POST   | `/api/login`    | Login user             |
| GET    | `/api/me`       | Get authenticated user |
| POST   | `/api/logout`   | Logout                 |
| POST   | `/api/refresh`  | Refresh token          |

---

## 🔄 Authentication Flow

```
Login →
  Receive JWT →
    Store token →
      API Requests →
        Token expires →
          Auto refresh →
            Retry request →
              Continue seamlessly
```

---

## 🧠 Key Concepts Implemented

* Layered Architecture (Controller → Service → Repository)
* JWT Authentication with refresh flow
* Axios interceptors (request + response)
* Role-based middleware
* Centralized API handling
* Scalable folder structure

---

## 🛡️ Security Notes

* Access tokens expire in **15 minutes**
* Refresh window: **14 days**
* Tokens auto-refresh without interrupting user experience
* Future improvements:

  * httpOnly cookies
  * CSRF protection

---

## 📌 Future Improvements

* 🔐 Move JWT to httpOnly cookies
* 🛡️ Add CSRF protection
* 📊 Add dashboard UI
* 📱 Multi-device session management
* 🔍 Logging & monitoring

---

## 👨‍💻 Author

**Jibin Thomas**

* GitHub: https://github.com/Jibinthomas0007
