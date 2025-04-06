import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AppContextProvider from "./context/AppContext.jsx";
import ArtisanContextProvider from "./context/ArtisanContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ArtisanContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ArtisanContextProvider>
  </BrowserRouter>
  
);
