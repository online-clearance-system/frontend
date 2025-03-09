import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from '././components/forms/SignUp'
import Login from '././components/forms/Login'
import Student from '././components/dashboard/Student'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  )
}

export default App