import React, { useEffect, useRef } from "react";
import image1 from "../../assets/images/1.jpg";
import image2 from "../../assets/images/2.jpg";
import image3 from "../../assets/images/3.jpg";
import image4 from "../../assets/images/4.jpg";
import image5 from "../../assets/images/5.jpg";
import image6 from "../../assets/images/6.jpg";
import image7 from "../../assets/images/7.jpg";
import image8 from "../../assets/images/8.jpg";

const DecaPrism = () => {
  const carouselRef = useRef(null);

  const colors = [
    "#f5f2e4", // 1.jpg
    "#f2f2eb", // 2.jpg
    "#f5fafc", // 3.jpg
    "#f5faf8", // 4.jpg
    "#fdfcff", // 5.jpg
    "#f7f7ff", // 6.jpg
    "#fafafa", // 7.jpg
    "#f2f0e9", // 8.jpg
  ];

  const rgbToArray = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const arrayToRgb = ([r, g, b]) => {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };

  const updateBackground = () => {
    const carousel = carouselRef.current;
    let angle = parseFloat(
      carousel.style.transform?.replace("rotateY(", "")?.replace("deg)", "") ||
        "0"
    );
    if (!carousel.style.transform) {
      const time = (Date.now() / 20000) % 1; // 20s animation cycle
      angle = time * 360;
    }
    angle = ((angle % 360) + 360) % 360; // Normalize to 0–360

    const segment = 360 / 8; // 45 degrees per image
    let totalWeight = 0;
    let blendedRgb = [0, 0, 0];
    colors.forEach((color, index) => {
      const imageAngle = index * segment;
      const angularDistance = Math.abs(
        ((angle - imageAngle + 180) % 360) - 180
      );
      const maxDistance = segment / 2; // 22.5 degrees
      const weight = Math.max(0, 1 - angularDistance / maxDistance); // Linear fade
      totalWeight += weight;
      const rgb = rgbToArray(color);
      blendedRgb[0] += rgb[0] * weight;
      blendedRgb[1] += rgb[1] * weight;
      blendedRgb[2] += rgb[2] * weight;
    });

    if (totalWeight > 0) {
      blendedRgb = blendedRgb.map((c) => c / totalWeight);
      const blendedColor = arrayToRgb(blendedRgb);
      const heroSection = document.querySelector(".hero");
      if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, ${blendedColor}, #ffffff)`;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateBackground, 50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          carouselRef.current.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused";
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(carouselRef.current);

    updateBackground();

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="col-md-4 text-center">
      <div
        className="carousel-3d-wrapper"
        role="region"
        aria-label="3D branding showcase carousel"
      >
        <div className="carousel-3d" id="carousel" ref={carouselRef}>
          <img
            src={image1}
            alt="3D branding concept for product display"
            loading="lazy"
          />
          <img
            src={image2}
            alt="Branded vehicle for outdoor campaign"
            loading="lazy"
          />
          <img src={image3} alt="Outdoor advertising campaign" loading="lazy" />
          <img src={image4} alt="Instore branding setup" loading="lazy" />
          <img src={image5} alt="Event activation display" loading="lazy" />
          <img src={image6} alt="Point-of-sale display" loading="lazy" />
          <img
            src={image7}
            alt="Creative branding installation"
            loading="lazy"
          />
          <img
            src={image8}
            alt="Team executing branding project"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default DecaPrism;