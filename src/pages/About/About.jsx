import React from "react";
import "../../index.css";
import "./About.css";
import aboutImage from "../../assets/images/nairobi.jpg";
import aboutCompanyImage from "../../assets/images/about.jpeg";
import companyProfile from "../../assets/documents/company-profile.pdf";
import impactImage from "../../assets/images/impact.jpg";
import teamData from "../../data/teamData";
import TeamMember from "../../components/TeamCard/TeamMember";
import impactData from "../../data/impactData";
import ImpactCard from "../../components/impact/ImpactCard";

const About = () => {
  return (
    <div className="about-page">
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="container">
          <h1 className="hero-heading">Who We Are</h1>
          <p className="hero-description">
            A results-driven branding agency that is not afraid of challenges.
          </p>
        </div>
      </section>

      <section className="section about-company">
        <div className="container">
          <div className="company-info">
            <div className="company-content">
              <h2 className="section-title">About Zamar</h2>
              <p>
                Zamar Solutions Limited is an experiential marketing and
                branding agency (instore and outdoor) that has been in existence
                for 7 years. We have built a reputation for delivering
                innovative and effective marketing solutions that help our
                clients connect with their audiences in meaningful ways.
              </p>
              <p>
                Our expertise spans across strategic consulting, retail
                marketing, brand activations, and comprehensive branding
                solutions. We believe in creating memorable experiences that
                bring brands to life and drive tangible results.
              </p>
              <a
                href={companyProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="button1"
              >
                Company Profile
              </a>
            </div>
            <div className="company-image">
              <img src={aboutCompanyImage} alt="Zamar Solutions Team" />
            </div>
          </div>
        </div>
      </section>
      {/* mission section */}
      <section className="section mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-box">
              <h3>Our Mission</h3>
              <p>Activations and beyond</p>
              <p>
                We strive to create impactful brand experiences that connect
                companies with their target audience through innovative
                marketing strategies and activations.
              </p>
            </div>
            <div className="vision-box">
              <h3>Our Vision</h3>
              <p>To be the leading corporate retail solutions provider</p>
              <p>
                We aim to revolutionize how brands engage with consumers by
                delivering cutting-edge retail marketing solutions that drive
                growth and brand loyalty.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* impact section */}
      <section
        className="section impact-section"
        style={{ backgroundImage: `url(${impactImage})` }}
      >
        <div className="container">
          <h2
            className="sub-section-heading"
            style={{
              color: "white",
              textAlign: "center",
              lineHeight: "1.9rem",
            }}
          >
            Our Impact
          </h2>
          <p
            className="section-description"
            style={{ color: "white", textAlign: "center" }}
          >
            Empowering brands with innovative activations and strategic branding
            solutions across Kenya, Rwanda, Uganda, Tanzania, and South Sudan.
          </p>
          <div className="impact-grid">
            {impactData.map((item, index) => (
              <ImpactCard
                key={index}
                number={item.number}
                suffix={item.suffix}
                heading={item.heading}
              />
            ))}
          </div>
        </div>
      </section>

      {/* team section */}
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Behind every successful campaign is our dedicated team of creative
            and strategic professionals who bring passion and expertise to every
            project.
          </p>
          <div className="team-grid">
            {teamData.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                imageSrc={member.imageSrc}
                description={member.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
