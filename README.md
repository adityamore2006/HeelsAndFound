# Heels & Found

A full-stack MERN (MongoDB, Express, React, Node) application for tracking lost and found items.

## 📂 Project Structure

This project is split into two parts:
1. **Root Folder (`/`):** The Backend API (Node.js & Express).
2. **Frontend Folder (`/react-app`):** The User Interface (React, TypeScript, Vite).

---

## 🚀 How to Install & Run

Because the frontend and backend are separate, you must install dependencies for **both**.

### Step 1: Environment Setup
Create a `.env` file in the root folder with your MongoDB Atlas connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=<app-name>
```
Replace `<username>`, `<password>`, `<cluster-url>`, and `<app-name>` with your actual MongoDB Atlas credentials. Ensure your IP is whitelisted in Atlas.

### Step 2: Install Dependencies
Open your terminal in the project root and run:
```bash
# 1. Install Backend libraries (Express, Mongoose, CORS)
npm install

# 2. Install Frontend libraries (React, Axios, TypeScript)
cd react-app
npm install
```

### Step 3: Running it
#### Terminal 1 (Backend): Make sure you are in root folder
```bash
npm run dev
```
#### Terminal 2 (Frontend): Navigate to react-app
```bash
cd react-app
npm run dev
```
