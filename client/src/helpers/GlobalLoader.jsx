/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext, useContext } from "react";
// import { RingLoader } from "react-spinners"; // 👈 Ring Loader
import { HashLoader } from "react-spinners"; // 👈 Ring Loader

// Default styles
const styles = {
  loader: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    maxWidth: "90%",
  },
  title: {
    fontSize: "18px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    color: "#fff",
    marginTop: "15px",
  },
};

// Initial empty state
const initialState = {
  showLoader: () => {},
  hideLoader: () => {},
};

// Context
const GlobalLoaderContext = createContext(initialState);

// Hook
export const useGlobalLoaderContext = () => useContext(GlobalLoaderContext);

// Provider
export const GlobalLoader = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState("");

  const showLoader = (title) => {
    setIsVisible(true);
    setLoaderTitle(title || "Loading...");
  };

  const hideLoader = () => {
    setIsVisible(false);
  };

  const renderComponent = () => {
    if (!isVisible) return null;

    return (
      <div className="global-loader" style={styles.loader}>
        <div className="center" style={styles.center}>
           <HashLoader className="global-loader" color="red" size={80} /> {/* 👈 HashLoader */}
          <p className="title" style={styles.title}>
            {}
          </p>
        </div>
      </div>
    );
  };

  return (
    <GlobalLoaderContext.Provider value={{ showLoader, hideLoader }}>
      {renderComponent()}
      {children}
    </GlobalLoaderContext.Provider>
  );
};
