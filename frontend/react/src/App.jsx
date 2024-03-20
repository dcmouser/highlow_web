import './App.css';

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home/index";
import About from "./pages/about/index";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/auth/profile";
import PasswordForgot from "./pages/auth/passwordForgot";
import PasswordReset from "./pages/auth/passwordReset";


function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/profile" element={<Profile />} />
              <Route path="/auth/passwordForgot" element={<PasswordForgot />} />
              <Route path="/auth/passwordReset" element={<PasswordReset />} />
          </Routes>
      </Router>
  );
}

export default App;
