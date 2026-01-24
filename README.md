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
This process handles the encrypted user database and JWT authentication logic.
```bash
npm run start:backend
```
*The server will start on `http://localhost:5000`.*

### 4. Start the Frontend (Terminal 2)
Open a **new** terminal window and start the development server:
```bash
npm run dev
```
*The interface will be accessible at `http://localhost:5173`.*

---

## 🛠️ System Architecture

- **Frontend**: React 19, Vite, Tailwind CSS.
- **Backend**: Node.js, Express, BcryptJS, JSON Web Token (JWT).
- **Security**: Passwords are hashed. Tokens are issued on successful login and stored in `localStorage`.

### 🧩 Simulation Mode
If the frontend cannot reach the backend (e.g., if Terminal 1 isn't running), it will automatically switch to **Simulation Mode**.
- In this mode, users and tokens are managed via the browser's `LocalStorage`.

---
**CODEMANIA_OS // SECURITY_LEVEL_04**