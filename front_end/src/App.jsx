import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Layers/Header";
import HeroSection from "./Layers/HeroSection";
import BottomNav from "./Layers/BottomNav";
import HospiPharmColla from "./Layers/HospiPharmColla";
import AboutUs from "./Layers/AboutUs";
import Testimonials from "./Layers/Testimonials";
import Contact from "./Layers/CotactUs"; // Consider renaming for consistency
import Footer from "./Layers/Footer";
import Rolecheck from "./Auth/RoleChecker/Rolecheck";
import AdminDash_board from "./Page/Admin/AdminDash_board";
import DoctorDash_board from "./Page/Doctor/DoctorDash_board";
import PharmacyDash_board from "./Page/Pharmacist/PharmacyDash_board";
import AdminHeader from "./components/Admin/Header";
import NotFound from "./Page/Not Found/Not_Found";
import Counter from "./Layers/services";
import { useDispatch, useSelector } from "react-redux";
import { CheckAuths } from "./store/useSlice";
import { useEffect, useState } from "react";
import Settings from "./components/Admin/Settings";
import Reports from "./components/Admin/Reports";
import Users from "./components/Admin/Users";

function App() {
  const { isAuthenticated} = useSelector((state) => state.Auth);
  
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await dispatch(CheckAuths()).unwrap();
      } catch (error) {
        console.error("Authentication check failed:", error);
        toast.error("Authentication check failed. Please try again.");
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show loading state while checking authentication

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Rolecheck isAuthenticated={isAuthenticated} >
              <Header />
              <HeroSection />
              <BottomNav />
              <Counter />
              <HospiPharmColla />
              <AboutUs />
              <Testimonials />
              <Contact />
              <Footer />
            </Rolecheck>
          }
        />
        <Route
          path="DoctorDash_board"
          element={
            <Rolecheck isAuthenticated={isAuthenticated}>
              <DoctorDash_board />
            </Rolecheck>
          }
        />
        <Route
          path="PharmaDash_board"
          element={
            <Rolecheck isAuthenticated={isAuthenticated}>
              <PharmacyDash_board />
            </Rolecheck>
          }
        />
        <Route
          path="AdminDash_board"
          element={
            <Rolecheck isAuthenticated={isAuthenticated}>
              <AdminDash_board />
            </Rolecheck>
          }
        />
        <Route path="/AdminDash_board/settings" element={<Settings />} />
        <Route path="/AdminDash_board/Reports" element={<Reports/>} />
        <Route path="/AdminDash_board/Users" element={<Users/>} />
    

              
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
