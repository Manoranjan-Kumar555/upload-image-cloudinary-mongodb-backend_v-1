// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import ImageUploader from "./component/ImageUploader";
import ImageGallery from "./component/ImageGallery";
import "./component/uploader.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      {/* Navbar Component */}
      <NavBar />

      <div className="app_page-container ">
        {/* Page Content */}
        <main>
          <Routes>
            <Route path="/login" element= {<Login/>}/>
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/upload" element={<ImageUploader />} />
            <Route path="/data" element={<ImageGallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
