import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Logo from './Bank-of-America-Logo-PNG_011.png';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    const accountNumber = localStorage.getItem('accountNumber');
    if (accountNumber) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accountNumber');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="myNav navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <h3 className="logoname">
                <img src={Logo} className="logo-ctl" alt="Bank of America Logo" style={{ marginRight: '20px' }} />
                BANK OF AMERICA
              </h3>
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
