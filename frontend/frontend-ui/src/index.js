import React from "react";
import ReactDOM from "react-dom/client";
import ChessBoard from "./App"; // Assuming ChessBoard is in App.js
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChessBoard />
  </React.StrictMode>
);
