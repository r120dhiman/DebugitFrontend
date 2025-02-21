import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Profile from './Pages/Profile'
import NewPoll from './Pages/NewPoll'
import Vote from './Pages/Vote'
import Report from './Pages/Report'
import Privacy from './Pages/Privacy'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/privacy-policy" element={<Privacy/>}/>
        <Route path="/newpoll" element={<NewPoll/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
