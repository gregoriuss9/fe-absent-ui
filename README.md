# 🚀 Absent UI

This is the **frontend (React)** application for the Employee Attendance System. It provides interfaces for employees to submit attendance and for HRD to monitor submissions in real time via WebSocket.

---

## 📦 Tech Stack

- ⚛️ React + TypeScript
- 💅 Tailwind CSS
- 🌐 Axios (REST API)
- 🔐 JWT Auth
- 🔔 Socket.IO (real-time notifications)
- 📦 React Query (server state) and Zustand (client global state)

---

---

## 🚀 Features

- 🔐 Login & credential update (username/password)
- 🧑‍💼 Employee check-in with photo upload
- 🧭 HRD dashboard with employee management
- 🔔 Real-time notification to HRD using Socket.IO
- 📦 Fully typed with TypeScript

---

## 🛠 Installation

Clone the project and install dependencies:

```bash
npm install
```

To start the development server:

```bash
npm run dev
npm run dev -- --host #expose in static local IP
```

---

## 📦 Folder Structure

```
absent-ui/
├── public/               # Static files (favicon, icons, etc.)
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable UI components (Button, Input, Modal, etc.)
│   ├── hooks/            # Custom React hooks (e.g., useJWT, useSocket)
|   ├── layout/           # Layout for the pages
|   ├── lib/              # Axios instance
│   ├── pages/            # Page-level components (HomePage, LoginPage, etc.)
│   ├── services/         # API clients (authService, mainService)
│   ├── store/            # Zustand store
│   ├── types/            # TypeScript types/interfaces
│   ├── utils/            # Helper utilities (JWT decoding, validation, etc.)
│   └── App.tsx           # Main app layout and routing
│   └── main.tsx          # Entry point for Vite + React
├── .env                  # Environment variables (API URLs, etc.)
├── package.json
├── tailwind.config.js
└── tsconfig.json
```
