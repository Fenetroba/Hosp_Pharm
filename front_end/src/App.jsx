import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Layers/Header";
import HeroSection from "./Layers/HeroSection";
import BottomNav from "./Layers/BottomNav";
import HospiPharmColla from "./Layers/HospiPharmColla";
import AboutUs from "./Layers/AboutUs";
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
import { Toaster } from "@/components/ui/sonner";

import PrescriptionDetail from "./components/Doctor/PrescriptionDetail";
import CRUD from "./components/Doctor/Doctors_data";
import User from "./components/Pharmasist/User";
import History from "./components/Pharmasist/History";
import FAQ from "./Layers/FAQ";

function App() {
  const { isAuthenticated,user} = useSelector((state) => state.Auth);


  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(CheckAuths());

    
  }, []);

  // Show loading state while checking authentication

  return (
    <div>
      <Toaster />
    
      <Routes>
        <Route
          path="/"
          element={
            <Rolecheck isAuthenticated={isAuthenticated} user={user} >
              <Header />
              <HeroSection />
              <BottomNav />
              <Counter />
              <HospiPharmColla />
              <AboutUs />
        
              <FAQ/>
              <Contact />
              <Footer />
            </Rolecheck>
          }
        />
        <Route
          path="DoctorDash_board"
          element={
            <Rolecheck isAuthenticated={isAuthenticated} user={user} >
              <DoctorDash_board/>
            </Rolecheck>
          }
        />
        
        <Route path="DoctorDash_board/detail" element={<PrescriptionDetail user={user} />} />  
        <Route path="/DoctorDash_board/priscription" element={<CRUD user={user}/>} />  
        
        <Route
          path="pharmacist"
          element={
            <Rolecheck isAuthenticated={isAuthenticated} user={user} >
              <PharmacyDash_board/>
            </Rolecheck>
          }
        />
        <Route path="/pharmacist/user" element={<User user={user}/>} />
        <Route path="/pharmacist/history" element={<History />} />

       
        <Route
          path="AdminDash_board"
          element={
            <Rolecheck isAuthenticated={isAuthenticated} user={user} >
              <AdminDash_board  user={user}/>
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
