import './App.css'
import {Route,Router} from 'react-router-dom'
import Header from './Layers/Header'
import HeroSection from './Layers/HeroSection'
import BottomNav from './Layers/BottomNav'
import HospiPharmColla from './Layers/HospiPharmColla'
function App() {
  

  return (
   <div>
   <Header/>
   <HeroSection/>
   <BottomNav/>
   <HospiPharmColla/>
   </div>
  )
}

export default App
