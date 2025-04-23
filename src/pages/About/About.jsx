import React from "react";
import "../../index.css";
import "./About.css";
import aboutImage from "../../assets/images/nairobi.jpg";
import aboutCompanyImage from "../../assets/images/company.jpg";
import teamPlaceholderImage from "../../assets/images/team.jpg";
import teamPlaceholderImage1 from "../../assets/images/team1.jpg";
import teamPlaceholderImage2 from "../../assets/images/team2.jpg";
import companyProfile from "../../assets/documents/company-profile.pdf";
import impactImage from "../../assets/images/impact.jpg";
import missionImage from "../../assets/images/mission.svg";
import visionImage from "../../assets/images/vision.svg";

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
                download="Zamar_Solutions_Company_Profile.pdf"
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

      <section className="section mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-box">
              <h3>Our Mission</h3>
              <img
                src={missionImage}
                alt="Rocket representing Zamar’s mission for brand activation"
                className="card-illustration"
              />
<p className="card-p">Activations and Beyond</p>
              <p>
                We strive to create impactful brand experiences that connect companies with their target audience through innovative experiential marketing strategies and brand activations across Kenya and East Africa. From Nairobi roadshows to in-store promotions, our tailored vehicle branding and street marketing solutions drive engagement and build lasting brand loyalty. With clients like Lato Milk, we deliver tailored experiential marketing in Kenya that elevates brand visibility and fosters meaningful consumer connections.
              </p>
            </div>
            <div className="vision-box">
              <h3>Our Vision</h3>
              <img
                src={visionImage}
                alt="Binoculars representing Zamar’s vision for retail marketing"
                className="card-illustration"
              />
                <p className="card-p">To Be the Leading Corporate Retail Solutions Provider</p>
              <p>
                We aim to revolutionize how brands engage with consumers by delivering cutting-edge retail marketing and branding solutions that drive growth and loyalty. As Kenya’s leading brand activation agency, we deliver creative wall branding and retail marketing solutions across Nairobi and Tanzania. From billboards to mall activations, Zamar’s innovative strategies redefine corporate retail experiences in East Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <div className="impact-item">
              <div className="impact-number">
                <span className="number">120</span>
                <span className="suffix">+</span>
              </div>
              <h3 className="impact-heading">Projects Completed</h3>
            </div>
            <div className="impact-item">
              <div className="impact-number">
                <span className="number">35</span>
                <span className="suffix">+</span>
              </div>
              <h3 className="impact-heading">Clients Served</h3>
            </div>
            <div className="impact-item">
              <div className="impact-number">
                <span className="number">18</span>
                <span className="suffix">+</span>
              </div>
              <h3 className="impact-heading">Major Campaigns</h3>
            </div>
            <div className="impact-item">
              <div className="impact-number">
                <span className="number">7</span>
                <span className="suffix">+</span>
              </div>
              <h3 className="impact-heading">Years in Branding</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Behind every successful campaign is our dedicated team of creative
            and strategic professionals who bring passion and expertise to every
            project.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src={teamPlaceholderImage} alt="Sarah Mwangi" />
                <div className="member-overlay">
                  <h3 className="team-member-heading">Sarah Mwangi</h3>
                  <p className="team-member-description">
                    As Creative Director, Sarah crafts bold campaigns that
                    elevate brands.
                  </p>
                </div>
              </div>
              <h3 className="team-member-heading">Sarah Mwangi</h3>
              <p className="team-member-position">Creative Director</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src={teamPlaceholderImage1} alt="James Otieno" />
                <div className="member-overlay">
                  <h3 className="team-member-heading">James Otieno</h3>
                  <p className="team-member-description">
                    As Marketing Strategist, James drives impactful activations.
                  </p>
                </div>
              </div>
              <h3 className="team-member-heading">James Otieno</h3>
              <p className="team-member-position">Marketing Strategist</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src={teamPlaceholderImage2} alt="Linda Kamau" />
                <div className="member-overlay">
                  <h3 className="team-member-heading">Linda Kamau</h3>
                  <p className="team-member-description">
                    As Branding Specialist, Linda creates iconic visuals for
                    clients.
                  </p>
                </div>
              </div>
              <h3 className="team-member-heading">Linda Kamau</h3>
              <p className="team-member-position">Branding Specialist</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src={teamPlaceholderImage2} alt="Will Smith" />
                <div className="member-overlay">
                  <h3 className="team-member-heading">Will Smith</h3>
                  <p className="team-member-description">
                    As Graphic Designer, Will captures audiences with innovative
                    designs.
                  </p>
                </div>
              </div>
              <h3 className="team-member-heading">Will Smith</h3>
              <p className="team-member-position">Graphic Designer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;