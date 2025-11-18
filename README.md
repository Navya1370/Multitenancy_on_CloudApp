# Multi-Tenant Cloud App

A modern cloud application that allows multiple tenants (users or organizations) to securely manage their own Projects and Tasks inside a shared system — with complete data isolation.

Built using **Node.js • Express • MongoDB Atlas • React + Vite**.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ✨ Features

### 🏢 Multi-Tenant Architecture
Single shared application, multiple isolated tenants.

### 🔐 Strong Data Isolation
Each tenant sees only their own Projects and Tasks using tenantId filtering.

### ⚙️ Shared Database Model
A single MongoDB Atlas database containing three collections:
- tenants
- projects
- tasks

### 💻 Modern Web UI
Responsive dashboard built with React, Vite, ShadCN UI.

### 🔒 Authentication
Tenant login using email → JWT token generation.

### 📂 Project & Task Management
Each tenant can create projects, add tasks, and manage their work.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas
- Git (optional)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📦 Installation

### Clone the repository
```bash
git clone <repository-url>
cd cloudapp17
```

### Install dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ▶️ Run the App

### Start Backend
```bash
cd backend
node server.js
```
Runs at: **http://localhost:5000**

### Start Frontend
```bash
cd frontend
npm run dev
```
Runs at: **http://localhost:5173**

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🎯 Multi-Tenancy Logic

### 1. Tenant Login
Tenant authenticates using email → backend returns JWT + tenant data.

### 2. Tenant-Scoped Database Queries
```js
Project.find({ tenantId })
Task.find({ tenantId })
```
Ensures complete data isolation.

### 3. Data Storage Structure
Each project and task contains:
```json
tenantId: ObjectId(...)
```

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🔧 Backend Configuration

Create a `.env` file:
```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=5000
```

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📁 Project Structure

```
cloudapp17/
│
├── backend/
│   ├── models/
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── Tenant.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── .env
│
└── frontend/
    └── cloudscape-tenants-main/
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── (components, pages, hooks, etc.)
        │
        ├── .env
        ├── .gitignore
        ├── bun.lockb
        ├── components.json
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── README.md
        ├── tailwind.config.ts
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        └── vite.config.ts
```

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🎨 UI Features

- Clean SaaS-style design  
- Login page  
- Tenant-specific dashboard  
- Fully responsive layout  
- Smooth project/task navigation  

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛠️ Development Commands

Backend only → `npm run dev`  
Frontend only → `npm run dev`

------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📊 Performance

- Fast CRUD using MongoDB Atlas  
- Efficient filtering using tenantId  
- Lightweight Express server  

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛡️ Security

- JWT authentication  
- Tenant-scoped access  
- Input validation  
- ENV-based secrets  
- No tenant can access others' data  

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Deployment

- **Backend → Render**  
- **Frontend → Vercel (React + Vite)**  
- **Database → MongoDB Atlas**  

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🆘 Troubleshooting

- Login failing → Check if tenant exists in tenants collection  
- Projects not loading → Ensure tenantId is saved correctly  
- MongoDB not connecting → Verify `MONGO_URI`  

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🌟 License

Made with 😊 by **Navya**  
A clean and complete demonstration of implementing multi-tenancy in a cloud application.
