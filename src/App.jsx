// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import LandingPage from './Pages/LandingPage'
// import LoginPage from './Pages/LoginPage'
// import Signup from './Components/Signup'
// import Navbar from './Components/Navbar'
// import Footer from './Components/Footer'
// import Profile from './Pages/Profile'
// import NewPoll from './Pages/NewPoll'
// import Vote from './Pages/Vote'
// import Report from './Pages/Report'
// import Privacy from './Pages/Privacy'
// import ContactUs from './Pages/Contactus'

// function App() {
//   const [count, setCount] = useState(0)
  
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/contact" element={<ContactUs/>} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/vote" element={<Vote />} />
//         <Route path="/privacy-policy" element={<Privacy/>}/>
//         <Route path="/newpoll" element={<NewPoll/>}/>
//         <Route path="/profile" element={<Profile/>} />
//         <Route path="/report" element={<Report />} />
//       </Routes>
//       <Footer/>
//     </BrowserRouter>
//   )
// }

// export default App


import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './Api/Context' // Make sure this path is correct
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
import ContactUs from './Pages/Contactus'

// Guest-only route - redirects to home if logged in
const GuestRoute = ({ children }) => {
  const { loginData } = useUser();
  
  if (loginData) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Protected route - redirects to login if not logged in
const ProtectedRoute = ({ children }) => {
  const { loginData } = useUser();
  
  if (!loginData) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Guest-only routes */}
        <Route path="/login" element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />
        <Route path="/signup" element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/newpoll" element={
          <ProtectedRoute>
            <NewPoll />
          </ProtectedRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App