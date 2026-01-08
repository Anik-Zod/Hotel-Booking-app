
# 🏨 Hotel Booking FullStack Application

A comprehensive, full-stack hotel booking solution featuring a modern user interface, secure payments, and a powerful admin dashboard. This project is built as a monorepo containing the backend API, user-facing client, and administrative panel.

## ✨ Key Features

### 🌍 Client (User Frontend)
- **Seamless Booking Experience:** Intuitive interface for searching and booking hotels.
- **Secure Payments:** Integrated with **Stripe** for safe and reliable transactions.
- **Advanced Search:** Filter hotels by date, price, and location using `react-date-range`.
- **Modern UI/UX:** Responsive design built with **Tailwind CSS**, featuring smooth animations with **Framer Motion** and **Lenis** scroll.
- **State Management:** Robust state handling with **Redux Toolkit** and **React Query**.

### 🛡️ Admin Dashboard
- **Data Visualization:** Interactive charts and graphs powered by **Chart.js**.
- **Management Tables:** Advanced data grids using **Material UI (MUI)** for managing bookings, users, and rooms.
- **Real-time Updates:** Efficient data fetching and caching with **React Query**.
- **State Management:** Lightweight and fast state management using **Zustand**.

### 🔙 Backend (API)
- **RESTful API:** Scalable Node.js & Express server.
- **Database:** MongoDB with Mongoose for structured data modeling.
- **Authentication:** Secure user and admin authentication using **JWT** and **Better-Auth**.
- **Payment Processing:** Secure backend integration with **Stripe**.

### 📸 Screenshots

| Landing Page | landing Page |
|:---:|:---:|
| <img width="1891" height="942" src="https://github.com/user-attachments/assets/1718c65f-0040-4481-bc29-34bec2cf9a90" /> | <img width="1891" height="949" src="https://github.com/user-attachments/assets/43d79216-4244-4b65-9fbf-2f425543d081" /> |

| Filter Page | Hotel Page |
|:---:|:---:|
| <img width="1872" height="959" src="https://github.com/user-attachments/assets/3a710da5-99ca-4203-b01b-079461a17ab6" /> | <img width="1879" height="942" src="https://github.com/user-attachments/assets/2522814e-b8b3-4e17-9ac4-bc564180c61f" /> |

| Contact Page | Payment Page |
|:---:|:---:|
| <img width="1909" height="919" alt="image" src="https://github.com/user-attachments/assets/21a7c4bb-5180-4b97-aa6d-fa2ddc40e29c" /> | <img width="1898" height="944" alt="image" src="https://github.com/user-attachments/assets/46fd891c-0e8c-47b5-abe5-ed738de5926d" /> |

| Admin Login | Admin Home |
|:---:|:---:|
| <img width="1907" height="947" alt="image" src="https://github.com/user-attachments/assets/2012ef89-18c7-4bae-befd-7bc7cee08c46" /> | <img width="1896" height="959" alt="image" src="https://github.com/user-attachments/assets/070944c2-c930-44ac-9e22-14b002d1797b" /> |





---

## 🛠️ Tech Stack

### Client (`/client`)
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS 4, Lucide React
- **State & Fetching:** Redux Toolkit, TanStack Query
- **Animations:** Motion, Lenis
- **Forms & Dates:** React Date Range

### Admin (`/admin`)
- **Framework:** React 19 (Vite)
- **State & Fetching:** Zustand, TanStack Query
- **Charts:** Chart.js, React Chartjs 2
- **Styling:** Tailwind CSS 4, Tailwind Merge

### API (`/api`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, BCrypt, Better-Auth
- **Payments:** Stripe

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Atlas connection string)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/hotel-booking-fullstack.git
cd hotel-booking-fullstack
```

### 2. Backend Setup (`/api`)
Navigate to the api directory and install dependencies:
```bash
cd api
npm install
```

Create a `.env` file in the `api` directory with the following variables:
```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:
```bash
npm start
# or for development
npm run dev
```

### 3. Client Setup (`/client`)
Open a new terminal, navigate to the client directory:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (if needed for public keys):
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:8000/api
```

Start the client development server:
```bash
npm run dev
```

### 4. Admin Setup (`/admin`)
Open a new terminal, navigate to the admin directory:
```bash
cd admin
npm install
```

Create a `.env` file in the `admin` directory:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the admin development server:
```bash
npm run dev
```

---

## 📂 Project Structure

```bash
Hotel_Booking_FullStack/
├── api/             # Backend Node.js/Express server
├── client/          # User-facing React application
├── admin/           # Admin Dashboard React application
└── README.md        # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Made with ❤️ by [Your Name]
</p>
