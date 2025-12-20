import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
  console.log("ProtectedRoute - User:", user);
  console.log("ProtectedRoute - Loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if no user
  }

  return children; // Render the protected content if user is authenticated
};

const Layout = () => (
<div className="flex bg-[#111827] h-screen overflow-hidden">
  <Sidebar />
  {/* The 'min-w-0' is the secret fix for grid lag */}
  <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
    <Navbar />
    <main className="flex-1 overflow-y-auto">
       <Outlet />
    </main>
  </div>
</div>
);

const App = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        {/* Protected Routes */}
        {[
          { path: "/", element: <Home /> },
          { path: "users", element: <Users /> },
          { path: "hotels", element: <Hotels /> },
          { path: "rooms", element: <Rooms /> },
          { path: "profile", element: <User /> },
          { path: "users/:id", element: <User /> },
          { path: "hotels/:id", element: <Hotel /> },
        ].map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
      </Route>
      
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
