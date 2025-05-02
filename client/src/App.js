import React from "react";
import Login from "./components/login/login";
import { AuthProvider} from "./AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";




const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* login */}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
