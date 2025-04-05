import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Layers/Header";
import HeroSection from "./Layers/HeroSection";
import BottomNav from "./Layers/BottomNav";
import HospiPharmColla from "./Layers/HospiPharmColla";
import AboutUs from "./Layers/AboutUs";
import Testimonials from "./Layers/Testimonials";
import Contact from "./Layers/CotactUs";
import Footer from "./Layers/Footer";
import Rolecheck from "./Auth/RoleChecker/Rolecheck";
import AdminDash_board from "./Page/Admin/AdminDash_board";
import DoctorDash_board from "./Page/Doctor/DoctorDash_board";
import PharmacyDash_board from "./Page/Pharmacist/PharmacyDash_board";
import NotFound from "./Page/Not Found/Not_Found";
import Counter from "./Layers/services";

function App() {
  const user = true; // Change this based on your authentication logic
  const role = "doctor";
  const Location =useLocation()
  console.log(Location)

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Rolecheck user={user} role={role}>
              <Header />
              <HeroSection />
              <BottomNav />
              <Counter/>
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
            <Rolecheck user={user} role={role}>
              <DoctorDash_board />
            </Rolecheck>
          }
        />

        <Route
          path="PharmaDash_board"
          element={
            <Rolecheck user={user} role={role}>
              <PharmacyDash_board />
            </Rolecheck>
          }
        />

        <Route
          path="AdminDash_board"
          element={
            <Rolecheck user={user} role={role}>
              <AdminDash_board />
            </Rolecheck>
          }
        />

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
