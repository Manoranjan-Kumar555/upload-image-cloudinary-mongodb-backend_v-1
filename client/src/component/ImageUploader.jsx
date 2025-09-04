import React, { useRef, useState } from "react";
import axios from "axios";
import "./ImageUploader.css";
import toast from "react-hot-toast";
import { useGlobalLoaderContext } from "../helpers/GlobalLoader";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Yup Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("⚠️ Name is required"),
  email: yup.string().email("⚠️ Enter valid email").required("⚠️ Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "⚠️ Mobile must be 10 digits")
    .required("⚠️ Mobile is required"),
});

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // ✅ File Select
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setUploadedUrl(null);
    }
  };

    const openFileDialog = () => {
    fileInputRef.current.click(); // 👈 trigger input click
  };

  // ✅ Retake (open file dialog)
  const handleRetake = () => {
    document.getElementById("fileInput").click();
  };

  // ✅ Submit form
  const onSubmit = async (data) => {
    if (!file) {
      toast.error("⚠️ Please select an image!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);

      showLoader();
      const res = await axios.post(
        "http://localhost:8080/api/image/upload-form",
        formData
      );

      setUploadedUrl(res.data?.your_url?.image_url);
      toast.success("✅ Submitted Successfully!");
      navigate("/data");
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed!");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">📤 Upload Image with Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form-fields">
        {/* Name */}
        <input
          type="text"
          placeholder="👤 Enter Name"
          {...register("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="📧 Enter Email"
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Mobile */}
        <input
          type="text"
          placeholder="📱 Enter Mobile"
          {...register("mobile")}
        />
        {errors.mobile && <p className="error">{errors.mobile.message}</p>}

        {/* Upload Box */}
        <div className="upload-box" onClick={openFileDialog}>
          {!preview ? (
            <>
              <label htmlFor="fileInput" className="file-label">
                📂 Choose Image
              </label>
              <input
              ref={fileInputRef}
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </>
          ) : (
            <div className="preview-wrapper">
              <img className="preview-img" src={preview} alt="Preview" />
              <button type="button" className="retake-btn" onClick={handleRetake}>
                🔄 Retake
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </div>
          )}
        </div>
        {!file && <p className="error" style={{textAlign:"center"}}>⚠️ Image is required</p>}

        {/* Upload Button */}
        <button
          type="submit"
          className="upload-btn"
          disabled={!file || loading}
        >
          {loading ? "⏳ Uploading..." : "🚀 Upload"}
        </button>
      </form>

      {uploadedUrl && (
        <div className="result">
          <p className="success">✅ Uploaded Successfully!</p>
          <a href={uploadedUrl} target="_blank" rel="noreferrer">
            🔗 View Image
          </a>
          <img src={uploadedUrl} alt="Uploaded" className="uploaded-img" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
