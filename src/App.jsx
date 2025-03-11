import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '././components/forms/SignUp'
import Login from '././components/forms/Login'
import Student from '././components/dashboard/Student'
import Staff from '././components/dashboard/Staff'
// import Admin from '././components/dashboard/Admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </Router>
  )
}

export default App