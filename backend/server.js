import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./db/connectToMongoDB.js";



dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 6333;

// app.use(express.json({limit: "50mb"}));
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//     res.send("hi from server")
// });

server.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
    connectDB();
});