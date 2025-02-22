import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './Api/Context' 
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

const GuestRoute = ({ children }) => {
  const { loginData } = useUser();
  
  if (loginData) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
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