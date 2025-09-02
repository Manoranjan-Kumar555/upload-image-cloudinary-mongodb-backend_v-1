

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import ImageUploader from "./component/ImageUploader";
import ImageGallery from "./component/ImageGallery";
import "./component/uploader.css";

function App() {
  return (
    <Router>
      {/* Navbar Component */}
      <NavBar />

      <div
        style={{ background: "#f9fafb", minHeight: "100vh", padding: "40px" }}
      >
        {/* Page Content */}
        <main>
          <Routes>
            <Route path="/upload" element={<ImageUploader />} />
            <Route path="/data" element={<ImageGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
