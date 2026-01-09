# E-Shop: Full-Stack E-Commerce App (MERN with TypeScript)

A modern, type-safe full-stack e-commerce application built with the **MERN stack** (MongoDB, Express, React, Node.js) using **TypeScript** throughout for enhanced developer experience and reliability. 

## Tech Stack

### Frontend
- **React** (with TypeScript)
- **React Router** (for routing & URL-synced filters)
- **Tailwind CSS** + **Shadcn/ui** (beautiful, accessible components)
- **Redux Toolkit** + **RTK Query** (state management & data fetching with Axios)

### Backend
- **Node.js** + **Express.js** (RESTful APIs)
- **MongoDB** + **Mongoose** (NoSQL database)
- **TypeScript** (full type safety)

### Additional Tools
- **Cloudinary** (image uploads)
- **JWT** (authentication & authorization)
- **Bcrypt** (password hashing)
- **Nodemailer** (optional email features)

## Key Features

### User Features
- Browse products with **pagination**
- **Search** products (URL-synced: `?search=keyword`)
- **Category filtering** with checkboxes (multi-select, URL-synced: `?category=Electronics,Books`)
- Filters persist on refresh and work with browser back/forward
- Add to cart (local Redux state)
- User registration & login (JWT-based)
- Protected routes

### Admin Features
- Full **CRUD** operations for products (Create, Read, Update, Delete)
- Image upload via Cloudinary (create & update)
- Admin-only access (role-based authorization)

## Project Structure
```bash
e-shop/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── server.ts
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.tsx
│   └── tailwind.config.js
└── README.md
```

## Environment Variables
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```