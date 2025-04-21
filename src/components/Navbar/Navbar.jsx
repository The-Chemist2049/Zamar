import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-container">
          <Link to="/" className="navbar-logo">
            <span>ZAMAR</span> Solutions
          </Link>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <ul className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
            <li>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="outlet-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
