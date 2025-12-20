import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";

import Home from "./pages/Home";
import List from "./pages/List";
import Hotel from "./pages/Hotel";
import Contact from "./pages/Contact"
import Authentication from "./pages/auth/Authentication";

import { authClient } from "../lib/auth-client";
import { AuthContext } from "./context/AuthContext";
import FooterBanner from "./components/FooterBanner";
import Navbar from "./components/Navbar";
import OfferPage from "./pages/OfferPage";
import Success from "./components/stripe/Success";
import Failed from "./components/stripe/Failed";
import ScrollToTop from "./hooks/ScrollToTop";
import StickyButton from "./components/StickyButton";




function App() {
  const { dispatch } = useContext(AuthContext);

  // Get session from Better Auth
  const { data: session, isLoading } = authClient.useSession();

  // Optional: sync user to your context / localStorage
  useEffect(() => {
    if (session?.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: session.user });
      localStorage.setItem("user", JSON.stringify(session.user));
    }
  }, [session, dispatch]);

  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/hotDeals" element={<OfferPage/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/failed" element={<Failed/>} />
      </Routes> 
      <StickyButton/>
      <FooterBanner/>
    </BrowserRouter>
  );
}

export default App;
