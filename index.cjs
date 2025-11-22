const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables from .env
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Middleware stack
app.use(cors()); // Enable CORS for all origins
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json()); // Parse JSON bodies

// Root route
app.get("/", (req, res) => {
  res.send("Hello from the Chess backend!");
});

// Health check for tunnel and uptime monitoring
app.get("/health", (req, res) => {
  console.log("🔍 /health route hit");
  res.json({ status: "ok", tunnel: true, timestamp: new Date() });
});

// API health route (for internal monitoring)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("move", (data) => {
    console.log("♟️ Move received:", data);
    socket.broadcast.emit("move", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
