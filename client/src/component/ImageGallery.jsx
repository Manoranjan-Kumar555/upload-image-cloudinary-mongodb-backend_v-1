import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch all uploaded images from backend
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/image/all");
        setImages(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <h2>All Uploaded Images</h2>
      <div className="gallery-grid">
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          images.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img.image_url} alt={`img-${i}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
