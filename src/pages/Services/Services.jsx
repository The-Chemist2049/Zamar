import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import "./Services.css";
import "../../index.css";
import servicesImage from "../../assets/images/services.jpg";
import ProcessStepCard from "../../components/Process/ProcessStepCard";
import processSteps from "../../data/processSteps";
import services from "../../data/Services";
import processImage from "../../assets/images/process.jpg";

const Services = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isMobile = useRef(window.innerWidth <= 768);
  const autoSlideIntervalRef = useRef(null);

  const SLIDE_DURATION = 5000;
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    const updateIsMobile = () => {
      isMobile.current = window.innerWidth <= 768;
    };

    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile.current) return;

    const startAutoSlide = () => {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, SLIDE_DURATION);
    };

    startAutoSlide();

    return () => clearInterval(autoSlideIntervalRef.current);
  }, [services.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    resetAutoSlide();
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
    resetAutoSlide();
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
      resetAutoSlide();
    }
  };

  const resetAutoSlide = () => {
    if (isMobile.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length);
      }, SLIDE_DURATION);
    }
  };

  const handleTouchStart = (e) => {
    clearInterval(autoSlideIntervalRef.current);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta > 0 ? goToPrevSlide() : goToNextSlide();
    }
  };

  return (
    <motion.div className="services-page">
      <motion.section
        className="services-hero"
        style={{ backgroundImage: `url(${servicesImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="container">
          <h1 className="hero-heading">We Offer the Best Branding Services</h1>
          <p className="hero-description">
            Zamar Solutions delivers experiential marketing across East
            Africa—offering brand activations, retail marketing, strategic
            branding, and printing services with innovative thinking, flawless
            execution, and a results-driven approach that brings brands to life.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => {
                const servicesMainSection =
                  document.querySelector(".services-main");
                if (servicesMainSection) {
                  servicesMainSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="button1"
            >
              Explore More
            </button>
            <button className="button2" onClick={() => navigate("/contact")}>
              Request a quote
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section services-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          <div className="services-grid desktop-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
              >
                <ServiceCard
                  image={service.image}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="service-card"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="services-carousel"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="carousel-inner"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {services.map((service, index) => (
                <motion.div
                  className="carousel-item"
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <ServiceCard
                    icon={service.icon}
                    image={service.image}
                    className="service-card"
                    title={service.title}
                    description={service.description}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="carousel-nav">
              <button
                className="carousel-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                &lt;
              </button>
              <button
                className="carousel-next"
                onClick={goToNextSlide}
                aria-label="Next slide"
              >
                &gt;
              </button>
            </div>

            <div className="carousel-indicators">
              {services.map((service, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`${service.title} - slide ${index + 1} of ${
                    services.length
                  }`}
                  aria-current={index === currentSlide}
                  title={service.title}
                >
                  <span className="indicator-label">{index + 1}</span>
                </button>
              ))}
            </div>

            <div className="carousel-slide-info">
              <span className="current-slide">{currentSlide + 1}</span>
              <span className="slide-divider">/</span>
              <span className="total-slides">{services.length}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section service-process"
        style={{ backgroundImage: `url(${processImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeInOut", delay: 0.4 }}
      >
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <div className="process-steps">
            {processSteps.map((stepData, index) => (
              <ProcessStepCard key={index} {...stepData} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section cta-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="container">
          <div className="cta-content">
            <h2>Ready to transform your brand experience?</h2>
            <p>
              Contact us today to discuss how our services can help achieve your
              marketing goals.
            </p>
            <a href="/contact" className="button1">
              Get In Touch
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Services;
