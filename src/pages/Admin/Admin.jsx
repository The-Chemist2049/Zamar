import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";

function Admin() {
  const [category, setCategory] = useState("Brand_Activations");
  const [subcategory, setSubcategory] = useState("Indoor");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Check if subcategory should be shown
  const showSubcategory =
    category === "Brand_Activations" ||
    category === "Indoor_and_Outdoor_Branding";

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const resetForm = () => {
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(""); // Clear any existing messages

    try {
      const formData = new FormData();
      formData.append("category", category);
      if (showSubcategory) {
        formData.append("subcategory", subcategory);
      }
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "https://zamarsolutions.co.ke/Zamar/index.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Upload successful!");
        resetForm(); // Clear input after upload
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>

      {message && (
        <div
          className={`message ${
            message.includes("successful") ? "success" : "error"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="Brand_Activations">Brand Activations</option>
            <option value="Indoor_and_Outdoor_Branding">
              Indoor and Outdoor Branding
            </option>
            <option value="Digital_Screen_Marketing">
              Digital Screen Marketing
            </option>
            <option value="Digital_Marketing">Digital Marketing</option>
            <option value="Client">New Client</option>
          </select>
        </div>

        {showSubcategory && (
          <div className="form-group">
            <label htmlFor="subcategory">Select Subcategory:</label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={handleSubcategoryChange}
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="image">Select Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.href = "/";
        }}
        className="button-logout"
      >
        Logout
      </button>
    </div>
  );
}

export default Admin;
