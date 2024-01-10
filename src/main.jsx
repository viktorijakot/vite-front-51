// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthCtxProvider from "./store/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthCtxProvider>
      <App />
    </AuthCtxProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
