# ⚡ CODEMANIA ADMIN PORTAL

A cyberpunk-themed authentication system featuring a Node.js/Express backend and a React/Vite frontend.

---

## 🚀 Quick Start Guide

To get the full system running (Auth + UI), follow these steps in order:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Initialization
Open your terminal in the project root folder and install all necessary packages:
```bash
npm install
```

### 3. Start the Backend (Terminal 1)
This process handles the encrypted user database and authentication logic.
```bash
npm run start:backend
```
*The server will start on `http://localhost:3000`.*

### 4. Start the Frontend (Terminal 2)
Open a **new** terminal window (keep the first one running) and start the development server:
```bash
npm run dev
```
*The interface will be accessible at `http://localhost:5173`.*

---

## 🛠️ System Architecture

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, BcryptJS (for password hashing), CORS.
- **Security**: Passwords are never stored in plain text. They are salted and hashed before being saved to the mainframe.

### 🧩 Simulation Mode
If the frontend cannot reach the backend (e.g., if Terminal 1 isn't running), it will automatically switch to **Simulation Mode**.
- In this mode, users are stored in your browser's `LocalStorage`.
- A yellow warning banner will appear at the top of the portal.
- Once the backend is detected, the portal will switch to the real Express server.

## ⚠️ Important Notes
- **Data Persistence**: This version uses an in-memory array for the backend. Restarting the backend server will wipe all registered users. 
- **Production**: For a production environment, connect `server.js` to a database like MongoDB or PostgreSQL.

---
**CODEMANIA_OS // SECURITY_LEVEL_04**