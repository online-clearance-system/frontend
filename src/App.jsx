import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '././components/forms/SignUp'
import Login from '././components/forms/Login'
import ForgotPassword from './components/forms/ForgotPassword'
import EmailSent from './components/forms/EmailSent'
import Student from '././components/dashboard/Student'
import Staff from '././components/dashboard/Staff'
import Admin from '././components/dashboard/Admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/email-sent" element={<EmailSent/>} />
        <Route path="/student" element={<Student />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App