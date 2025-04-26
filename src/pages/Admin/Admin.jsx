import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";

function Admin() {
  const [category, setCategory] = useState("Brand_Activations");
  const [subcategory, setSubcategory] = useState("Indoor");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Check if subcategory should be shown
  const showSubcategory =
    category === "Brand_Activations" ||
    category === "Indoor_and_Outdoor_Branding";

  // Handle toast display and auto-dismiss
  useEffect(() => {
    let toastTimer;
    if (toast.show) {
      toastTimer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000); // Toast will disappear after 3 seconds
    }
    return () => clearTimeout(toastTimer);
  }, [toast]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

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
    // Reset the file input by creating a reference and resetting its value
    const fileInput = document.getElementById("image");
    if (fileInput) fileInput.value = "";
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData to send file
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
        showToast("Upload successful!", "success");
        resetForm(); // Clear the image input after successful upload
      } else {
        showToast("Upload failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Error uploading. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload an Image</h2>

      {/* Toast notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-message">{toast.message}</div>
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
            <option value="Client">New Client</option>{" "}
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
          <input type="file" id="image" onChange={handleImageChange} required />
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
