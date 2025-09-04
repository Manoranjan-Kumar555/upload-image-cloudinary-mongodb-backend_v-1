import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./component/NavBar";
import ImageUploader from "./component/ImageUploader";
import ImageGallery from "./component/ImageGallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ PrivateRoute Component
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  // ✅ If route requires "user", allow both user & admin
  if (role === "user" && (userRole === "user" || userRole === "admin")) {
    return children;
  }

  // ✅ If route requires "admin", only admin can access
  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/upload" />; // redirect normal users to upload
  }

  return children;
};

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User route (upload → accessible to both user & admin) */}
          <Route
            path="/upload"
            element={
              <PrivateRoute role="user">
                <ImageUploader />
              </PrivateRoute>
            }
          />

          {/* Admin-only route (data → only admin) */}
          <Route
            path="/data"
            element={
              <PrivateRoute role="admin">
                <ImageGallery />
              </PrivateRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
