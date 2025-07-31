import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

import cors from 'cors';



dotenv.config();
const app = express();
connectDB();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



// test route
app.get("/", (req, res) => {
    res.send("Hello World from Express!");
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

import memoryRoutes from "./routes/memory.routes.js";
app.use("/api/memories", memoryRoutes);



app.listen(process.env.PORT, () => {
    console.log("Server Running on Port 3000")
})



