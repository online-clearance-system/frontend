import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignUp from '././components/forms/SignUp'
import Login from '././components/forms/Login'
import ForgotPassword from './components/forms/ForgotPassword'
import EmailSent from './components/forms/EmailSent'
import Student from '././components/dashboard/Student'
import Staff from '././components/dashboard/Staff'
import LandingPage from './components/LandingPage'
import { AuthProvider } from './contexts/AuthContext'
import Admin from '././components/dashboard/Admin'

// Protected route component
const ProtectedRoute = ({ children, userType }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If userType is specified, check if user has the right type
  if (userType && user.userType !== userType) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/email-sent" element={<EmailSent/>} />
          
          {/* Protected routes */}
          <Route path="/student" element={
              <Student />
          } />
          
          <Route path="/staff" element={
              <Staff />
          } />
          
          <Route path="/admin" element={
              <Admin />
          } />
        </Routes> 
      </Router>
    </AuthProvider>
  )
}

export default App