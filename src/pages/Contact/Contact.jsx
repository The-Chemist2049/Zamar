import React from "react";
import "./Contact.css";
import { Mail, Phone, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="zamar-contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.header
        className="zamar-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Let's Connect</h1>
        <p>
          We're excited to hear from you. Send us a message or give us a call!
        </p>
      </motion.header>

      {/* Content Grid */}
      <div className="zamar-grid">
        {/* Contact Form */}
        <motion.form
          className="zamar-form"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2>Send Us a Message</h2>
          <div className="form-field">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <div className="form-field">
            <label>Your Message</label>
            <textarea
              rows="6"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Submit
          </motion.button>
        </motion.form>

        {/* Contact Info + Map */}
        <motion.div
          className="zamar-info-box"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2>Contact Details</h2>

          <motion.div className="zamar-info-item" whileHover={{ scale: 1.01 }}>
            <Phone className="icon" />
            <div>
              <p>
                <strong>Call Us</strong>
              </p>
              <p>
                +254 724 679 202
                <br />
                +254 750 082 211
              </p>
            </div>
          </motion.div>

          <motion.div className="zamar-info-item" whileHover={{ scale: 1.01 }}>
            <Mail className="icon" />
            <div>
              <p>
                <strong>Email</strong>
              </p>
              <p>
                <a href="mailto:sales@zamarsolutions.co.ke">
                  sales@zamarsolutions.co.ke
                </a>
                <br />
                <a href="mailto:marketing@zamarsolutions.co.ke">
                  marketing@zamarsolutions.co.ke
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div className="zamar-info-item" whileHover={{ scale: 1.01 }}>
            <Globe className="icon" />
            <div>
              <p>
                <strong>Website</strong>
              </p>
              <a
                href="https://www.zamarsolutions.co.ke"
                target="_blank"
                rel="noreferrer"
              >
                www.zamarsolutions.co.ke
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="zamar-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7615573288426!2d36.832766624965785!3d-1.3187408486687486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11b005f6a0ab%3A0x22bcff8d667d8146!2sRamco%20Courts%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1745245750384!5m2!1sen!2ske"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zamar Location - Ramco Courts"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
