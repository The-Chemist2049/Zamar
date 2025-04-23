import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand/react";
import DynamicContentStore from "../../libs/dynamic_content";
import HeroSection from "../../components/HeroSection/HeroSection";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../data/Services";
import { testimonials } from "../../data/testimonials";
import "./Home.css";
import ValueCard from "../../components/CoreSection/ValueCard";
import { Flex, Title } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Added for meta tags

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState([]);
  // Fetch data from the API
  useEffect(() => {
    const baseUrl = "https://zamar.pockethost.io/";

    const clientLogos = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/collections/Clients/records`
        );
        setClients(response.data.items);
      } catch (error) {
        console.error("Error fetching client logos:", error);
      }
    };

    clientLogos();
  }, []);

  const store = useStore(DynamicContentStore);

  // Set up GSAP animations
  useEffect(() => {
    const animateServiceCards = () => {
      const serviceCards = document.querySelectorAll(".service-cad");

      serviceCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            x: -50,
            opacity: 0,
            rotateY: 45,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.3,
          }
        );
      });
    };

    const resetServiceCards = () => {
      const serviceCards = document.querySelectorAll(".service-cad");
      serviceCards.forEach((card, index) => {
        gsap.set(card, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          rotateY: 45,
        });
      });
    };

    if (document.querySelectorAll(".service-cad").length > 0) {
      ScrollTrigger.create({
        trigger: ".services-section",
        start: "top bottom-=100",
        end: "bottom center",
        onEnter: animateServiceCards,
        onEnterBack: animateServiceCards,
        onLeave: resetServiceCards,
        onLeaveBack: resetServiceCards,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Initialize SEO-optimized values
  useEffect(() => {
    const sampleValues = [
      {
        id: "1",
        title: "Vision",
        description:
          "<p>To be the leading experiential marketing agency in Kenya, delivering innovative brand activation solutions across East Africa.</p>",
      },
      {
        id: "2",
        title: "Mission",
        description:
          "<p>Our mission is to create impactful brand activations and corporate branding services that drive visibility and engagement.</p>",
      },
      {
        id: "3",
        title: "Core Values",
        description:
          "<p>Integrity, trust, and creativity fuel our retail marketing and vehicle branding solutions for businesses in Nairobi and beyond.</p>",
      },
    ];

    DynamicContentStore.getState().fill("values", sampleValues);
  }, []);

  // Get values from store
  const values = [...store.values.values()];

  return (
    <>
      {/* Add SEO meta tags */}
      <Helmet>
        <title>Experiential Marketing Agency in Kenya | Zamar Solutions</title>
        <meta
          name="description"
          content="Zamar Solutions is Kenya’s top experiential marketing agency, offering brand activation, vehicle branding, and retail marketing services across East Africa. Contact us today!"
        />
        <meta
          name="keywords"
          content="experiential marketing Kenya, brand activation agency, vehicle branding Nairobi, retail marketing solutions, branding agency Kenya"
        />
      </Helmet>

      <HeroSection />
      <div className="core-section">
        <Title order={2} className="core-title">
          At Our Core: Leading Brand Activation in Kenya
        </Title>
        <div className="values-row">
          {values.map((value) => (
            <ValueCard value={value} key={value.id} />
          ))}
        </div>
      </div>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Experiential Marketing Services</h2>
          <div className="services-grid">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <ServiceCard
                  image={service.image}
                  icon={service.icon}
                  title={service.title} // Titles like "Brand Activations," "Vehicle Branding"
                  description={service.description} // Updated in Services.js
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
              Explore All Branding Solutions
            </button>
          </div>
        </div>
      </section>

      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title">Our Valued Clients</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-logo">
                <img
                  src={`https://zamar.pockethost.io/api/files/Clients/${client.id}/${client.logo}`}
                  alt={`${client.name} - Branding Partner Kenya`}
                />
              </div>
            ))}
            {clients.map((client, index) => (
              <div key={`dup-${index}`} className="client-logo">
                <img
                  src={`https://zamar.pockethost.io/api/files/Clients/${client.id}/${client.logo}`}
                  alt={`${client.name} - Marketing Solutions East Africa`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say About Us</h2>
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                text={testimonial.text}
                name={testimonial.name}
                position={testimonial.position}
                company={testimonial.company}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Boost Your Brand with Zamar?</h2>
            <p>
              Partner with Kenya’s leading brand activation agency for unforgettable marketing campaigns and custom branding solutions. Let’s make your brand shine!
            </p>
            <Link to="/contact" className="btn btn-large">
              Start Your Brand Activation Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;