import React, { useContext, useState, useEffect } from "react";
import Login from "./components/login/login";
import { AuthProvider, AuthContext } from "./AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/register/register";


const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to='/login' />;
};

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* login */}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
       

          {/* <Route
            path='/validate-otp-login'
            element={
              <PrivateRoute>
                <ValidateOTPLogin />
              </PrivateRoute>
            }
          />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
