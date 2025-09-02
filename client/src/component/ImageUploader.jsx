import React, { useState } from "react";
import axios from "axios";
import "./ImageUploader.css"; // Import CSS

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("myfile", file);

      const res = await axios.post("http://localhost:8080/api/image/upload", formData);
      setUploadedUrl(res.data?.your_url?.image_url);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">📤 Upload Image</h2>

      <div className="upload-box">
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
        <label htmlFor="fileInput" className="file-label">
          {file ? file.name : "Choose File"}
        </label>

        <button className="upload-btn" onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {preview && (
        <div className="preview-container">
          <p>📷 Preview:</p>
          <img className="preview-img" src={preview} alt="Preview" />
        </div>
      )}

      {uploadedUrl && (
        <div className="result">
          <p className="success">✅ Uploaded Successfully!</p>
          <a href={uploadedUrl} target="_blank" rel="noreferrer">
            View Image
          </a>
          <img src={uploadedUrl} alt="Uploaded" className="uploaded-img" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
