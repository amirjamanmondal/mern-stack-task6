import React, { useState, useEffect } from "react";
import "./css/Slider.css"; // Create a CSS file for basic styles

const SliderImage = () => {
  const images = [
    "https://img.freepik.com/premium-photo/html-system-websites-collage-design_23-2150432963.jpg?w=826",
    "https://img.freepik.com/free-photo/assortment-pieces-cake_114579-85732.jpg?ga=GA1.1.1386864261.1733328684&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/chocolate-cake-with-cream-nuts-chocolate-spread_140725-10904.jpg?ga=GA1.1.1386864261.1733328684&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/strawberry-cake-wood_109285-3119.jpg?ga=GA1.1.1386864261.1733328684&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/side-view-fruit-cake-topped-with-chocolate-curl-whipped-cream-table-served-with-tea_140725-11955.jpg?ga=GA1.1.1386864261.1733328684&semt=ais_hybrid",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Swipe functionality
  const handleSwipe = (e, type) => {
    if (type === "left") nextSlide();
    if (type === "right") prevSlide();
  };

  return (
    <div
      className="slider"
      onTouchStart={(e) => (e.target.startX = e.touches[0].clientX)} // Capture touch start
      onTouchEnd={(e) => {
        const endX = e.changedTouches[0].clientX;
        const startX = e.target.startX;
        if (startX - endX > 50) handleSwipe(e, "left"); // Swipe left
        if (endX - startX > 50) handleSwipe(e, "right"); // Swipe right
      }}
    >
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SliderImage;
