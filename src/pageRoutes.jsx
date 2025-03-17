import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import PasswordProtect from './components/passwordProtect';
import Home from './pages/home';
import AdminHome from './pages/admin/home';
import CV from './pages/CV';
import Victoryvault from './pages/victoryvault-showcase';
import Pos from './pages/pos-system-showcase';
import Clients from './pages/client-portfolio';
import Navbar from './components/navbar';
import MobileNavbar from './components/mobileNavbar';
import './index.css';

const PageRoutes = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      {isMobile ? (
        <>
          <MobileNavbar activeLink={activeLink} setActiveLink={setActiveLink} />
          <div className="flex-1 overflow-y-auto w-full pt-20 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-4">
              <Routes>
                <Route
                  path="/admin/*"
                  element={
                    <PasswordProtect>
                      <Routes>
                        <Route path="/" element={<AdminHome />} />
                      </Routes>
                    </PasswordProtect>
                  }
                />
                <Route path="/" element={<Home />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/victoryvault" element={<Victoryvault />} />
                <Route path="/pos-system" element={<Pos />} />
                <Route path="/client-websites" element={<Clients />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto pl-64 w-full overflow-hidden">
            <div className="w-full max-w-7xl mx-auto">
              <Routes>
                <Route
                  path="/admin/*"
                  element={
                    <PasswordProtect>
                      <Routes>
                        <Route path="/" element={<AdminHome />} />
                      </Routes>
                    </PasswordProtect>
                  }
                />
                <Route path="/" element={<Home />} />
                <Route path="/cv" element={<CV />} />
                <Route path="/victoryvault" element={<Victoryvault />} />
                <Route path="/pos-system" element={<Pos />} />
                <Route path="/client-websites" element={<Clients />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
};

export default PageRoutes;
