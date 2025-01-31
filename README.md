<p align="center">
  <img 
    src="https://raw.githubusercontent.com/shuaib-code/cyclo/main/src/assets/crank1.png" 
    alt="Cyclo Logo" 
    width="200" 
    height="200"
    style="display: inline-block; margin-right: 0;"
  >
  <img 
    src="https://raw.githubusercontent.com/shuaib-code/cyclo/main/src/assets/cyclo-logo.png" 
    alt="Cyclo text Logo"
     width="450"
    style="display: inline-block;"
  >
</p>

# 🚴Cyclo, Bicycle Store Application

## 📌 Project Overview

The **Bicycle Store Application** is a full-stack web platform that allows users to browse, purchase, and manage bicycles online. It includes role-based authentication, an intuitive UI/UX, and secure payment integration.

## ✨ Features

### 🔓 Authentication

- Secure user registration and login with hashed passwords
- Role-based access control (Customer & Admin)
- JWT-based authentication and session management

### 🪪 Credentials

- **Email**: admin@gmail.com
- **password**: 111111

### 🏠 Public Routes

- **Home Page**: Featured bicycles, promotions, and customer testimonials
- **All Bicycles Page**: Search, filter, and view bicycle details
- **Bicycle Details Page**: Detailed specifications with a "Buy Now" option
- **About Page**: Information about the bicycle store and mission

### 🔒 Private Routes

- **Checkout Page**: Secure ordering with stock validation and payment processing
- **User Dashboard**: View and manage orders, update profile and passwords
- **Admin Dashboard**: Manage users, bicycles (CRUD operations), and orders

### 💳 Payment Integration

Supports **Stripe** for secure transactions.

## 🛠️ Tech Stack

### **Frontend**

- React, TypeScript, Redux (RTK Query), Tailwind CSS, ShadCN

### **Backend**

- Node.js, Express.js, MongoDB (Mongoose, Zod for validation) -[!Server Side Repo](https://github.com/shuaib-code/cyclo-server)

### **Authentication & Security**

- JWT, bcrypt for password hashing, role-based access control

## 🚀 Getting Started

### 🔧 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shuaib-code/cyclo-client.git
   ```
2. Navigate to the project folder:
   ```sh
   cd cyclo-client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

```
# Server url
# VITE_API_URL=https://api.example.com
#VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
#VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
#VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
#VITE_SP= Stripe pusblisable key
```

### 🚀 Run the Application

#### **Frontend**

```sh
cd client
npm start
```

#### **Backend**

```sh
cd server
npm start
```

## 📜 API Endpoints

### **Auth**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `POST /api/auth/logout` - Logout user

### **Bicycles**

- `GET /api/bicycles` - Get all bicycles
- `POST /api/bicycles` - Add a new bicycle (Admin only)
- `PUT /api/bicycles/:id` - Update bicycle details (Admin only)
- `DELETE /api/bicycles/:id` - Remove a bicycle (Admin only)

### **Orders**

- `POST /api/orders` - Place an order
- `GET /api/orders/user` - Get user-specific orders
- `GET /api/orders/admin` - Get all orders (Admin only)

## 🛠️ Contributing

1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Open a Pull Request

## 📄 License

This project is **open-source** and available under the MIT License.

---

🚴 **Happy Coding!**
