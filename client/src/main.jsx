import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
// import { BrowserRouter } from "react-router-dom";
import { GlobalLoader } from "./helpers/GlobalLoader"; // adjust path

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalLoader>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          className: "custom-toast", // 👈 attach CSS class
        }}
      />
    </GlobalLoader>
  </StrictMode>
);
