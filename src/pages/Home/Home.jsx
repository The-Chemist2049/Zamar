import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand/react";
import DynamicContentStore from "../../libs/dynamic_content";
import HeroSection from "../../components/HeroSection/HeroSection";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import "./Home.css";
import ValueCard from "../../components/CoreSection/ValueCard";
import { Flex, Title } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import icons for Why Choose Us section
import expertiseIcon from "/icons/expertise.svg";
import innovationIcon from "/icons/innovation.svg";
import qualityIcon from "/icons/quality.svg";
import supportIcon from "/icons/support.svg";

const Home = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [loading, setLoading] = useState(true); // Client loading state
  const [servicesLoading, setServicesLoading] = useState(true); // Service loading state
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const valuesRowRef = useRef(null);
  const testimonialsSliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [servicesimages, setServicesimages] = useState([]);

  // Fetch services images from the API
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          "https://zamarsolutions.co.ke/Zamar/api/get_images.php"
        );
        const items = response.data;
        const filteredServices = items.filter(
          (item) => item.category === "Services"
        );
        setServicesimages(filteredServices);
        setServicesLoading(false); // Turn off loading when data is received
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesLoading(false); // Turn off loading on error
      }
    };
    fetchServices();
  }, []);

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

  // Service Card Skeleton Component
  const ServiceCardSkeleton = () => (
    <div className="service-card-wrapper">
      <div className="service-card skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-description"></div>
        </div>
      </div>
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
            {servicesLoading ? (
              // Show skeleton cards while loading
              <>
                <ServiceCardSkeleton />
                <ServiceCardSkeleton />
                <ServiceCardSkeleton />
              </>
            ) : (
              // Show actual service cards when loaded
              servicesimages.slice(0, 3).map((service, index) => (
                <div key={index} className="service-card-wrapper">
                  <ServiceCard
                    image={service.image_URL}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    className="service-card"
                  />
                </div>
              ))
            )}
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
      {/* Clients */}
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

      {/* Why Choose Us section */}
      <section className="why-choose-us-section">
        <div className="why-us-container">
          <h2 className="why-us-title">Why Choose Us</h2>
          <div className="why-us-grid">
            <div className="why-us-card">
              <div className="why-icon-container">
                <img src={expertiseIcon} alt="Expertise" className="why-icon" />
              </div>
              <h3>Expertise</h3>
              <p>
                Our team of experienced professionals brings years of industry
                knowledge to every project.
              </p>
            </div>
            <div className="why-us-card">
              <div className="why-icon-container">
                <img
                  src={innovationIcon}
                  alt="Innovation"
                  className="why-icon"
                />
              </div>
              <h3>Innovation</h3>
              <p>
                We stay ahead of the curve with cutting-edge technology and
                creative solutions.
              </p>
            </div>
            <div className="why-us-card">
              <div className="why-icon-container">
                <img src={qualityIcon} alt="Quality" className="why-icon" />
              </div>
              <h3>Quality</h3>
              <p>
                We maintain the highest standards of quality in all our products
                and services.
              </p>
            </div>
            <div className="why-us-card">
              <div className="why-icon-container">
                <img src={supportIcon} alt="Support" className="why-icon" />
              </div>
              <h3>Support</h3>
              <p>
                Our dedicated support team is always ready to assist you with
                any queries or issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
