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
// import { clients } from "../../data/clients";
import "./Home.css";
import ValueCard from "../../components/CoreSection/ValueCard";
import { Flex, Title } from "@mantine/core";
import axios from "axios";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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
        // assuming the data has an 'items' array
      } catch (error) {
        console.error("Error fetching client logos:", error);
      }
    };

    clientLogos();
  }, []);
  console.log(clients);

  const store = useStore(DynamicContentStore);

  // Set up GSAP animations
  useEffect(() => {
    // Service card animations
    const animateServiceCards = () => {
      const serviceCards = document.querySelectorAll(".service-card");

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
      const serviceCards = document.querySelectorAll(".service-card");
      serviceCards.forEach((card, index) => {
        gsap.set(card, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          rotateY: 45,
        });
      });
    };

    // Set up scroll triggers
    if (document.querySelectorAll(".service-card").length > 0) {
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

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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

  return (
    <>
      <HeroSection />
      <div className="core-section">
        <Title order={2} className="core-title">
          At Our Core
        </Title>
        <div className="values-row">
          {values.map((value) => (
            <ValueCard value={value} key={value.id} />
          ))}
        </div>
      </div>

      <section className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  className="service-card"
                />
              </div>
            ))}
          </div>
          <div className="view-more-container">
            <Link to="/services" className="btn">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title">Our Clients</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-logo">
                <img
                  src={`https://zamar.pockethost.io/api/files/Clients/${client.id}/${client.logo}`}
                  alt={client.name}
                />
              </div>
            ))}

            {clients.map((client, index) => (
              <div key={`dup-${index}`} className="client-logo">
                <img
                  src={`https://zamar.pockethost.io/api/files/Clients/${client.id}/${client.logo}`}
                  alt={client.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
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
            <h2>Ready to elevate your brand presence?</h2>
            <p>
              Get in touch with us today and let's create impactful marketing
              solutions together.
            </p>
            <Link to="/contact" className="btn btn-large">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
