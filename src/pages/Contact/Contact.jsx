import React from "react";
import "./Contact.css";
import { Mail, Phone, Globe } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    setLoading(true);

    try {
      const res = await fetch(
        "https://zamarsolutions.co.ke/contact-form-handler.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.text();
      if (result === "success") {
        toast.success("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setStatus("");
      } else {
        toast.error("❌ " + result);
        setStatus("❌ Error: " + result);
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.");
      console.error(error);
      setStatus("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="zamar-contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ToastContainer position="top-center" autoClose={5000} />

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
          onSubmit={handleSubmit}
        >
          <h2>Send Us a Message</h2>
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-field">
            <label>Your Message</label>
            <textarea
              rows="6"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Sending..." : "Submit"}
          </motion.button>
          {status && <p className="form-status">{status}</p>}
        </motion.form>

        {/* Contact Info */}
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
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        className="zamar-map-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7615573288426!2d36.832766624965785!3d-1.3187408486687486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11b005f6a0ab%3A0x22bcff8d667d8146!2sRamco%20Courts%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1745245750384!5m2!1sen!2ske"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zamar Location - Ramco Courts"
        ></iframe>
      </motion.div>

      {/* Call-to-Action Section */}
      <motion.div
        className="zamar-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <h2>Contact Us Today!</h2>
        <p>
          Make Your Next Event Unforgettable: Let Zamar Solutions Create a Show-Stopping Experience.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;