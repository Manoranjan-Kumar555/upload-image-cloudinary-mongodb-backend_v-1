import React from "react";
import "./uploader.css";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="app-header">
      <h1>Image App</h1>
      <nav>
        <button
          className={activeTab === "upload" ? "active" : ""}
          onClick={() => setActiveTab("upload")}
        >
          Upload Image
        </button>
        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Show All Images
        </button>
        
      </nav>
    </header>
  );
};

export default Header;
