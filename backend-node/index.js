const express = require("express");
const app = express();

app.use(express.json());

// Example endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Backend-node is running on Vercel!" });
});

// Export the app for Vercel serverless
module.exports = app;
