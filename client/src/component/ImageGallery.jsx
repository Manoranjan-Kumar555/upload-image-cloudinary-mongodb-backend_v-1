import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteDiologueBox from "../component/dialogBox/DeleteDiologueBox"

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
          console.log("user Details :- ", images);
        } else if (res.data.images && Array.isArray(res.data.images)) {
          setImages(res.data.images);
          console.log("user Details :- ", res.data.images);
          // setUserData(res.data.images)
        } else {
          setImages([]); // fallback
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Delete image
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/image/${id}`);
  //     setImages((prev) => prev.filter((img) => img._id !== id)); // update state
  //   } catch (error) {
  //     console.error("Delete failed:", error);
  //   }
  // };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        images.map((img) => (
          <div
            key={img._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems:"center"
            }}
          >
            <div style={{ width: "200px", height: "200px" }}>
              <img
                src={img.Image_Url}
                alt="uploaded"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
              />
            </div>
            <div className="details">
              <h3>{img.name || "No Name"}</h3>
              <p>Email: {img.email || "N/A"}</p>
              <p>Mobile: {img.mobile || "N/A"}</p>
            </div>
            <DeleteDiologueBox  id={img._id} setImages={setImages}/>
            {/* <button
              onClick={() => handleDelete(img._id)}
              style={{
                marginTop: "10px",
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
            >
              Delete
            </button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
