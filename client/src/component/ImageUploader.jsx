import React, { useState } from "react";
import axios from "axios";
import "./ImageUploader.css"; // Import CSS

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setUploadedUrl(null);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async () => {
    if (!file || !form.name || !form.email || !form.mobile) {
      alert("Please fill all fields and choose an image!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);

      const res = await axios.post(
        "http://localhost:8080/api/image/upload-form",
        formData
      );
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
      <h2 className="uploader-title">📤 Upload Image with Details</h2>

      <div className="form-fields">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Enter Mobile"
          value={form.mobile}
          onChange={handleChange}
        />
      </div>

      <div className="upload-box">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* <label htmlFor="fileInput" className="file-label">
          {file ? file.name : "Choose File"}
        </label> */}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!file || loading}
        >
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
