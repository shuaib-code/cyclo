# 🚴 Bicycle Store Application

## 📌 Project Overview

The **Bicycle Store Application** is a full-stack web platform that allows users to browse, purchase, and manage bicycles online. It includes role-based authentication, an intuitive UI/UX, and secure payment integration.

## ✨ Features

### 🔓 Authentication

- Secure user registration and login with hashed passwords
- Role-based access control (Customer & Admin)
- JWT-based authentication and session management

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

Supports **SurjoPay, SSLCommerz, AmaarPay, or Stripe** for secure transactions.

## 🛠️ Tech Stack

### **Frontend**

- React, TypeScript, Redux (RTK Query), Tailwind CSS, ShadCN

### **Backend**

- Node.js, Express.js, MongoDB (Mongoose, Zod for validation)

### **Authentication & Security**

- JWT, bcrypt for password hashing, role-based access control

## 🚀 Getting Started

### 🔧 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/bicycle-store.git
   ```
2. Navigate to the project folder:
   ```sh
   cd bicycle-store
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_GATEWAY_KEY=your_payment_api_key
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
