import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AdminContextProvider from "./context/AdminContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
