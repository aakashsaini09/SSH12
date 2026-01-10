import "./src/config/env.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";

import authRoutes from "./src/routes/auth.routes.js";
import eventRoutes from "./src/routes/event.routes.js";
import joinRoutes from "./src/routes/join.routes.js";
import { connectDB } from "./src/config/db.js";
import { verifyEmail } from "./src/controllers/verifyEmail.js";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8001;

// DB
await connectDB();

// REST routes
app.use("/auth", authRoutes);
app.get("/auth/verify-email", verifyEmail);
app.use("/events", eventRoutes);
app.use("/join", joinRoutes);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// SOCKET AUTH (MANDATORY) 
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // { userId, email }
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

/* 💬 SOCKET EVENTS */
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.user.userId);

  socket.on("join-event-room", ({ eventId }) => {
    const room = `event:${eventId}`;
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("send-message", ({ eventId, message }) => {
    const room = `event:${eventId}`;

    io.to(room).emit("receive-message", {
      userId: socket.user.userId,
      message,
      timestamp: new Date()
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.user.userId);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
