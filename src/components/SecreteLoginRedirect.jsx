// src/components/SecretLoginRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SecretLoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "z") {
        navigate("/admin-login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
};

export default SecretLoginRedirect;
