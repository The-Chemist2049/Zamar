import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand/react";
import DynamicContentStore from "../../libs/dynamic_content";
import HeroSection from "../../components/HeroSection/HeroSection";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import { services } from "../../data/Services";
import { testimonials } from "../../data/testimonials";
import "./Home.css";
import ValueCard from "../../components/CoreSection/ValueCard";
import { Flex, Title } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { s } from "framer-motion/client";

const Home = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const valuesRowRef = useRef(null);
  const testimonialsSliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if the screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch data from the API
  useEffect(() => {
    const clientLogos = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          "https://zamarsolutions.co.ke/Zamar/api/get_images.php"
        );
        const items = response.data;

        if (!Array.isArray(items)) {
          console.error("Expected an array but got:", items);
          setLoading(false); // Turn off loading on error
          return [];
        }

        const filtered = items.filter((item) => item.category === "Client");
        setClients(filtered);
        setLoading(false); // Turn off loading when data is received
      } catch (error) {
        console.error("Error fetching client logos:", error);
        setLoading(false); // Turn off loading on error
        return [];
      }
    };

    clientLogos();
  }, []);

  const store = useStore(DynamicContentStore);

  // Initialize sample values
  useEffect(() => {
    const sampleValues = [
      {
        id: "1",
        title: "Vision",
        description:
          "<p>We envision a future where innovation and integrity drive every solution we create.</p>",
      },
      {
        id: "2",
        title: "Mission",
        description:
          "<p>Our mission is to deliver top-tier digital solutions that empower businesses to thrive.</p>",
      },
      {
        id: "3",
        title: "Core Values",
        description:
          "<p>We value transparency, teamwork, and technology-driven excellence in all we do.</p>",
      },
    ];

    DynamicContentStore.getState().fill("values", sampleValues);
  }, []);

  // Get values from store
  const values = [...store.values.values()];

  // Scroll to specific value card - only active in mobile mode
  const scrollToValueCard = (index) => {
    if (isMobile && valuesRowRef.current) {
      const cards = valuesRowRef.current.querySelectorAll(
        ".value-card-wrapper"
      );
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
        setActiveValueIndex(index);
      }
    }
  };

  // Scroll to specific testimonial card - only active in mobile mode
  const scrollToTestimonialCard = (index) => {
    if (isMobile && testimonialsSliderRef.current) {
      const cards = testimonialsSliderRef.current.querySelectorAll(
        ".testimonial-card-wrapper"
      );
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
        setActiveTestimonialIndex(index);
      }
    }
  };

  // Handle values carousel scroll - only in mobile mode
  const handleValuesScroll = () => {
    if (isMobile && valuesRowRef.current) {
      const scrollLeft = valuesRowRef.current.scrollLeft;
      const cardWidth =
        valuesRowRef.current.querySelector(".value-card-wrapper")
          ?.offsetWidth || 0;
      const gap = 16; // Approximated from your CSS

      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (
        newIndex !== activeValueIndex &&
        newIndex >= 0 &&
        newIndex < values.length
      ) {
        setActiveValueIndex(newIndex);
      }
    }
  };

  // Handle testimonials carousel scroll - only in mobile mode
  const handleTestimonialsScroll = () => {
    if (isMobile && testimonialsSliderRef.current) {
      const scrollLeft = testimonialsSliderRef.current.scrollLeft;
      const cardWidth =
        testimonialsSliderRef.current.querySelector(".testimonial-card-wrapper")
          ?.offsetWidth || 0;
      const gap = 40; // Approximated from your CSS

      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      if (
        newIndex !== activeTestimonialIndex &&
        newIndex >= 0 &&
        newIndex < testimonials.length
      ) {
        setActiveTestimonialIndex(newIndex);
      }
    }
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="spinner-text">Loading clients...</div>
    </div>
  );

  return (
    <>
      <HeroSection />
      <div className="core-section">
        <Title order={2} className="core-title">
          At Our Core
        </Title>
        <div className="carousel-container">
          {isMobile && (
            <div className="nav-buttons values-nav-buttons">
              <button
                className="nav-btn prev-btn"
                onClick={() => scrollToValueCard(activeValueIndex - 1)}
                disabled={activeValueIndex === 0}
              >
                ←
              </button>
              <button
                className="nav-btn next-btn"
                onClick={() => scrollToValueCard(activeValueIndex + 1)}
                disabled={activeValueIndex === values.length - 1}
              >
                →
              </button>
            </div>
          )}

          <div
            className="values-row carousel"
            ref={valuesRowRef}
            onScroll={isMobile ? handleValuesScroll : undefined}
          >
            {values.map((value, index) => (
              <div key={value.id} className="value-card-wrapper">
                <ValueCard value={value} />
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="indicators values-indicators">
              {values.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${
                    index === activeValueIndex ? "active" : ""
                  }`}
                  onClick={() => scrollToValueCard(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid1">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <ServiceCard
                  image={service.image}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="service-card"
                />
              </div>
            ))}
          </div>
          <div className="view-more-container">
            <button
              className="btn btn-large"
              onClick={() => navigate("/services")}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title">Our Clients</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="clients-grid">
              {clients.map((client, index) => (
                <div key={index} className="client-logo">
                  <img src={client.image_URL} alt={client.name} />
                </div>
              ))}

              {clients.map((client, index) => (
                <div key={`dup-${index}`} className="client-logo">
                  <img src={client.image_URL} alt={client.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="carousel-container testimonials-carousel-container">
            {isMobile && (
              <div className="nav-buttons testimonials-nav-buttons">
                <button
                  className="nav-btn prev-btn"
                  onClick={() =>
                    scrollToTestimonialCard(activeTestimonialIndex - 1)
                  }
                  disabled={activeTestimonialIndex === 0}
                >
                  ←
                </button>
                <button
                  className="nav-btn next-btn"
                  onClick={() =>
                    scrollToTestimonialCard(activeTestimonialIndex + 1)
                  }
                  disabled={activeTestimonialIndex === testimonials.length - 1}
                >
                  →
                </button>
              </div>
            )}

            <div
              className="testimonials-slider carousel"
              ref={testimonialsSliderRef}
              onScroll={isMobile ? handleTestimonialsScroll : undefined}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card-wrapper">
                  <TestimonialCard
                    text={testimonial.text}
                    name={testimonial.name}
                    position={testimonial.position}
                    company={testimonial.company}
                    image={testimonial.image}
                  />
                </div>
              ))}
            </div>

            {isMobile && (
              <div className="indicators testimonials-indicators">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator ${
                      index === activeTestimonialIndex ? "active" : ""
                    }`}
                    onClick={() => scrollToTestimonialCard(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to elevate your brand presence?</h2>
            <p>
              Get in touch with us today and let's create impactful marketing
              solutions together.
            </p>

            <Link to="/contact" className="btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
