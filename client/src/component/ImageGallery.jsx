import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteDiologueBox from "../component/dialogBox/DeleteDiologueBox";
import toast from "react-hot-toast";
import { useGlobalLoaderContext } from "../helpers/GlobalLoader";
import "./ImageGallery.css";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  const fetchImages = async () => {
    try {
      showLoader();
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/image/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let fetchedImages = [];
      if (Array.isArray(res.data)) {
        fetchedImages = res.data;
      } else if (res.data.images && Array.isArray(res.data.images)) {
        fetchedImages = res.data.images;
      }

      setImages(fetchedImages);
      toast.success("✅ Images & details fetched successfully!", {
        id: "fetch-success",
      });
    } catch (err) {
      console.error("Error fetching images:", err);
      toast.error(err.response?.data?.message || "❌ Failed to fetch images", {
        id: "fetch-error",
      });
    } finally {
      hideLoader();
    }
  };

  // ✅ Run only once on mount
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {/* ✅ Call fetchImages again after delete */}
              <DeleteDiologueBox id={img._id} onDelete={fetchImages} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery;
