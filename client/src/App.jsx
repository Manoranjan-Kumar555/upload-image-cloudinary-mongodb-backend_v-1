import React, { useState } from "react";
import Header from "./component/Header";
import ImageUploader from "./component/ImageUploader";
import ImageGallery from "./component/ImageGallery";
import "./component/uploader.css";

function App() {
  const [activeTab, setActiveTab] = useState("upload");
  return (
    <>
    {/* Header Component */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        style={{ background: "#f9fafb", minHeight: "100vh", padding: "40px" }}
      >
       {/* Page Content */}
      <main>
        {activeTab === "upload" && <ImageUploader />}
        {activeTab === "gallery" && <ImageGallery />}
      </main>
      </div>
    </>
  );
}

export default App;
