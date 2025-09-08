import React from "react";
import type { ReactElement } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import NavBar from "../component/NavBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ImageUploader from "../component/ImageUploader";
import ImageGallery from "../component/ImageGallery";

// ✅ PrivateRoute Component
const PrivateRoute = ({ children, role }: { children: ReactElement; role: "user" | "admin" }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  // ✅ If route requires "user", allow both user & admin
  if (role === "user" && (userRole === "user" || userRole === "admin")) {
    return children;
  }

  // ✅ If route requires "admin", only admin can access
  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/upload" replace />; // redirect normal users to upload
  }

  return children;
};

// ✅ Define routes with createBrowserRouter
export const router = createBrowserRouter(
  [
    {
      element: (
        <>
          <NavBar />
        </>
      ),
      children: [
        // Public routes
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },

        // User route (accessible to user & admin)
        {
          path: "/upload",
          element: (
            <PrivateRoute role="user">
              <ImageUploader />
            </PrivateRoute>
          ),
        },

        // Admin-only route
        {
          path: "/data",
          element: (
            <PrivateRoute role="admin">
              <ImageGallery />
            </PrivateRoute>
          ),
        },

        // Default/fallback
        { path: "*", element: <Navigate to="/login" replace /> },
      ],
    },
  ],
  
);

export default router;
