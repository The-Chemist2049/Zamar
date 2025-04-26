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

  useEffect(() => {
    // Close menu on escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when clicking outside
  const handleOutsideClick = (e) => {
    if (
      mobileMenuOpen &&
      e.target.closest(".navbar-links") === null &&
      e.target.closest(".mobile-menu-toggle") === null
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/logo.svg" alt="Logo" className="logo-img" />
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
