import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  // Fetch images
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/image/all")
      .then((res) => {
        console.log("API Response:", res.data);

        // Handle both formats: array OR object with `images`
        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else if (res.data.images && Array.isArray(res.data.images)) {
          setImages(res.data.images);
        } else {
          setImages([]); // fallback
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Delete image
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/image/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id)); // update state
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent:"center", alignContent:"center" }}>
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        images.map((img) => (
          <div
            key={img._id}
            style={{ border: "1px solid #ccc", padding: "10px", display:"flex", flexDirection:"column" }}
          >
            <img
              src={img.Image_Url}
              alt="uploaded"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <button
              onClick={() => handleDelete(img._id)}
              style={{
                marginTop: "10px",
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
