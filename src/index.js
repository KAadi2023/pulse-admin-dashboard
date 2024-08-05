

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { AuthContextProvider } from "context/authContext";
import { useAuth } from "context/authContext";

const container = document.getElementById("root");
const root = createRoot(container);

const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/admin/sign-in');
    }
  }, [isAuthenticated])
  return <App />
}

root.render(
  <BrowserRouter>
    <ArgonControllerProvider>
      <PerfectScrollbar>
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </PerfectScrollbar>
    </ArgonControllerProvider>
  </BrowserRouter>
);
