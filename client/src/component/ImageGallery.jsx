import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/image/all");
        // res.data.images should be an array
        setImages(res.data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img._id} style={{ textAlign: "center" }}>
              <img
                src={img.Image_Url}
                alt="uploaded"
                style={{ width: "200px", borderRadius: "8px" }}
              />
              <p style={{ fontSize: "12px", color: "#666" }}>
                {new Date(img.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
