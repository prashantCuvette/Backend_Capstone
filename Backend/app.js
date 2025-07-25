import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

connectDB();

app.use("/", (req, res) => {
    res.send("Hello World from Express!");
})



app.listen(process.env.PORT, () => {
    console.log("Server Running on Port 3000")
})



