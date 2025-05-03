import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";

function Admin() {
  const [category, setCategory] = useState("Brand_Activations");
  const [subcategory, setSubcategory] = useState("Indoor");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    imageURL: null,
  });

  const showSubcategory =
    category === "Brand_Activations" ||
    category === "Indoor_and_Outdoor_Branding";

  useEffect(() => {
    fetchImages();
  }, [category, subcategory]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    let toastTimer;
    if (toast.show) {
      toastTimer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
    }
    return () => clearTimeout(toastTimer);
  }, [toast]);

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

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://zamarsolutions.co.ke/Zamar/api/get_images.php"
      );
      const filtered = response.data.filter(
        (img) =>
          img.category === category &&
          (!showSubcategory || img.subcategory === subcategory)
      );
      setUploadedImages(filtered);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async (imageURL) => {
    setDeleteModal({ show: true, imageURL });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        "https://zamarsolutions.co.ke/Zamar/index.php",
        {
          data: { image_URL: deleteModal.imageURL },
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        showToast("Image deleted successfully!", "success");
        fetchImages();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      showToast("Error deleting image.", "error");
    } finally {
      setDeleteModal({ show: false, imageURL: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, imageURL: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        showToast("Upload successful!", "success");
        resetForm();
        fetchImages();
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
      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this image?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Delete
              </button>
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2>Upload an Image</h2>

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
          <input type="file" id="image" onChange={handleImageChange} required />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3>Uploaded Images</h3>
      <div className="image-grid">
        {uploadedImages.map((img, idx) => (
          <div key={idx} className="image-item">
            <img src={img.image_URL} alt="Uploaded" />
            <button
              onClick={() => handleDelete(img.image_URL)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

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
