import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteDiologueBox from "../component/dialogBox/DeleteDiologueBox";
import toast from "react-hot-toast";
import { useGlobalLoaderContext } from "../helpers/GlobalLoader";
import "./ImageGallery.css"; // 👈 separate CSS file

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        showLoader();
        const res = await axios.get("http://localhost:8080/api/image/all");

        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else if (res.data.images && Array.isArray(res.data.images)) {
          setImages(res.data.images);
          toast.success("Fetch all Image and Details Successfully!", {
            id: "fetch-success",
          });
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        toast.error("Failed to fetch images and details", { id: "fetch-error" });
      } finally {
        hideLoader();
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        images.map((img) => (
          <div key={img._id} className="card">
            <img src={img.Image_Url} alt="uploaded" className="card-img" />

            {/* Hidden Details */}
            <div className="card-details">
              <h3>{img.name || "No Name"}</h3>
              <p>📧 {img.email || "N/A"}</p>
              <p>📱 {img.mobile || "N/A"}</p>
              <DeleteDiologueBox id={img._id} setImages={setImages} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
