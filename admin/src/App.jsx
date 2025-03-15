import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import User from "./pages/User";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import Rooms from "./pages/Rooms";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Loading:', loading);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if no user
  }

  return children; // Render the protected content if user is authenticated
};


const Layout = () => (
  <div className="flex flex-col min-h-screen mt-16">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <aside className=" w-52  bg-gray-800  ">
        <Sidebar />
      </aside>
      <main className="flex-1  overflow-x-hidden bg-gray-100">
        <Outlet />
      </main>
    </div>
        <Footer />
  </div>
);


const App = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
        <Route path="rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="users/:id" element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path="hotels/:id" element={<ProtectedRoute><Hotel /></ProtectedRoute>} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
