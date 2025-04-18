import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Learn more about who we are and what drives us to excel</p>
        </div>
      </section>
      
      <section className="section about-company">
        <div className="container">
          <div className="company-info">
            <div className="company-content">
              <h2>Our Story</h2>
              <p>
                Zamar Solutions Limited is an experiential marketing and branding agency
                (instore and outdoor) that has been in existence for 7 years. We have built 
                a reputation for delivering innovative and effective marketing solutions 
                that help our clients connect with their audiences in meaningful ways.
              </p>
              <p>
                Our expertise spans across strategic consulting, retail marketing, brand activations,
                and comprehensive branding solutions. We believe in creating memorable experiences
                that bring brands to life and drive tangible results.
              </p>
            </div>
            <div className="company-image">
              <img src="/assets/images/about-company.jpg" alt="Zamar Solutions Team" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-box">
              <h3>Our Mission</h3>
              <p>Activations and beyond</p>
              <p>
                We strive to create impactful brand experiences that connect companies
                with their target audience through innovative marketing strategies and
                activations.
              </p>
            </div>
            <div className="vision-box">
              <h3>Our Vision</h3>
              <p>To be the leading corporate retail solutions provider</p>
              <p>
                We aim to revolutionize how brands engage with consumers by delivering
                cutting-edge retail marketing solutions that drive growth and brand
                loyalty.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="icon-value"></i>
              </div>
              <h3>Value Centric</h3>
              <p>
                We prioritize delivering genuine value to our clients and their customers
                in every project we undertake.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="icon-trust"></i>
              </div>
              <h3>Trust</h3>
              <p>
                We build lasting relationships based on trust, transparency and reliability
                with our clients and partners.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="icon-integrity"></i>
              </div>
              <h3>Integrity</h3>
              <p>
                We conduct our business with the highest ethical standards and honesty in
                all our dealings.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="icon-accountability"></i>
              </div>
              <h3>Accountability</h3>
              <p>
                We take ownership of our work and stand behind every project we deliver
                with a commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Behind every successful campaign is our dedicated team of creative and strategic
            professionals who bring passion and expertise to every project.
          </p>
          <div className="team-grid">
            {/* Note: Replace with actual team data when available */}
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/team/team-placeholder.jpg" alt="Team Member" />
              </div>
              <h3>Team Member</h3>
              <p>Position</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/team/team-placeholder.jpg" alt="Team Member" />
              </div>
              <h3>Team Member</h3>
              <p>Position</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/images/team/team-placeholder.jpg" alt="Team Member" />
              </div>
              <h3>Team Member</h3>
              <p>Position</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;