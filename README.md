# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.


📘 Employee Management Dashboard
✅ 1. Project Overview

The Employee Management Dashboard is a web-based application that allows administrators to manage employee records efficiently.

The system provides features such as:

Secure login authentication

Add, edit, and delete employees

Upload employee profile images

Activate / deactivate employees using toggle

Search employees by name

Filter employees by gender and status

View total, active, and inactive employee counts

Print employee list

Real-time notifications using toast messages

All employee data is stored locally in the browser using localStorage, making this application suitable for demo and learning purposes.

✅ 2. Tech Stack Used
Frontend

React.js (with TypeScript) – UI development and type safety

React Router – Navigation and routing

Tailwind CSS – Styling and responsive design

React Hot Toast – Toast notifications

React Icons – Icons for UI actions

Storage & State

LocalStorage – Persistent data storage in browser

React Hooks (useState, useEffect) – State management

Build Tool

Vite – Fast development and build tool

✅ 3. Steps to Run the Project Locally

Follow these steps to run the project on your system:

📌 Step 1: Clone the Repository
git clone <repository-url>
cd project-folder

📌 Step 2: Install Dependencies

Using npm:

npm install


Or using yarn:

yarn install

📌 Step 3: Start Development Server

Using npm:

npm run dev


Or yarn:

yarn dev

📌 Step 4: Open in Browser

After starting the server, open:

http://localhost:5173


(or the port shown in terminal)

📌 Step 5: Login Credentials (Demo)

Use the following demo credentials:

Email:    admin@example.com
Password: 1234

✅ 4. Assumptions & Design Decisions
🔹 1. LocalStorage as Database

The application uses localStorage instead of a backend.

This is suitable for demos and assignments.

Data is stored locally and resets when browser storage is cleared.

Assumption: No server-side database is required.

🔹 2. Image Handling

Profile images are stored as Base64 strings.

Image size is limited to 200KB to avoid storage overflow.

Large images are blocked.

Assumption: Images are for preview/demo purposes only.

🔹 3. Authentication

Login is handled using localStorage.

No real authentication server is used.

Credentials are hardcoded for demo.

Assumption: This is a frontend-only authentication system.

🔹 4. Loader Implementation

A loader is displayed when filters or search are applied.

This simulates real API behavior.

Design Decision: Improve user experience by mimicking network delay.

🔹 5. Form Validation

Client-side validation is implemented.

Required fields: Name, Gender, DOB, State

Invalid inputs are blocked.

Assumption: Backend validation is not required.

🔹 6. Toast Notifications

Toast messages are used for:

Login success

Add/Edit/Delete employee

Status change

Errors

Design Decision: Improve user feedback and UX.

🔹 7. Reusable Components

Reusable components were created for:

Status Toggle

Loader

Input Fields

Employee Form

Design Decision: Improve maintainability and scalability.

🔹 8. Development Mode Behavior

React Strict Mode may trigger some actions twice in development.

Toast logic is handled outside state updates to avoid duplication.

Assumption: Production build will not have duplicate behavior.

✅ 5. Key Features Summary
Feature	Status
Login System	✅
Employee CRUD	✅
Image Upload	✅
Status Toggle	✅
Filters	✅
Search	✅
Toast Notifications	✅
Loader	✅
Local Storage	✅
Responsive UI	✅
📌 Conclusion

This project demonstrates a complete frontend employee management system built using modern React and TypeScript practices. It focuses on:

Clean UI

User-friendly experience

Modular code structure

Proper validation and feedback

Practical frontend architecture

It is suitable for learning, demo, and assignment submission purposes.