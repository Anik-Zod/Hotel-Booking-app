import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/auth/Login";
import User from "./pages/User";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import Rooms from "./pages/Rooms";
import { useAuthStore } from "./stores/auth.store";
import { authClient } from "../lib/auth-client";

const ProtectedRoute = ({ user, authLoaded }) => {
  // Wait until we definitely know whether the user is logged in
  if (!authLoaded) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    // Not logged in → send to login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const LoginRoute = ({ user, authLoaded }) => {
  if (!authLoaded) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

const Layout = () => (
  <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-r from-global via-bg to-global pt-23">
    <Navbar />
    <div className="flex flex-1 w-full overflow-hidden">
      <aside className="w-fit flex-shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 min-w-0 overflow-y-auto px-1 lg:px-3 no-scrollbar">
        <Outlet />
      </main>
    </div>
  </div>
);

export default function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { data: session, isLoading, refetch } = authClient.useSession();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    // Force a session refetch on mount so the auth state actually updates
    refetch().finally(() => setAuthLoaded(true));
  }, [refetch]);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  return (
    <Router>
      <Routes>
        <Route
          element={<ProtectedRoute user={user} authLoaded={authLoaded} />}
        >
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="profile" element={<User />} />
            <Route path="users/:id" element={<User />} />
            <Route path="hotels/:id" element={<Hotel />} />
          </Route>
        </Route>

        <Route
          path="login"
          element={<LoginRoute user={user} authLoaded={authLoaded} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
