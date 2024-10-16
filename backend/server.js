import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./db/connectToMongoDB.js";



dotenv.config();
const PORT = process.env.PORT || 6333;

// app.use(express.json({limit: "50mb"}));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.send("hi from server")
// });

server.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
    connectDB();
});