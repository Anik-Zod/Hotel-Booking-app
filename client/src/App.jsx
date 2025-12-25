import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/Home";
import List from "./pages/List";
import Hotel from "./pages/Hotel";
import Contact from "./pages/Contact"
import Authentication from "./pages/auth/Authentication";
import Success from "./pages/Success";

import { authClient } from "../lib/auth-client";
import { setUser } from "./store/authSlice";
import FooterBanner from "./components/FooterBanner";
import Navbar from "./components/Navbar";
import OfferPage from "./pages/OfferPage";
import Failed from "./components/stripe/Failed";
import ScrollToTop from "./hooks/ScrollToTop";
import StickyButton from "./components/StickyButton";




function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Get session from Better Auth
  const { data: session, isLoading } = authClient.useSession();

  useEffect(() => {
    if(user) return; // user already in state

    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch, user]);

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
