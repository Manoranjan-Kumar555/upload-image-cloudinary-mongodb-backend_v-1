import React, { useState } from "react";
import axios from "axios";
import "./uploader.css";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("myfile", file);

      const response = await axios.post(
        "http://localhost:8080/api/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadedUrl(response.data?.your_url?.image_url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <h2>Upload Image</h2>

      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {preview && (
        <div className="preview-box">
          <p>Preview:</p>
          <img src={preview} alt="Preview" />
        </div>
      )}

      <button
        className="upload-btn"
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="result-box">
          <p className="success">✅ Upload Successful!</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <img src={uploadedUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
