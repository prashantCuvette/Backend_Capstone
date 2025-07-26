import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
connectDB();

// app.use("/", (req, res) => {
//     res.send("Hello World from Express!");
// })

app.use(express.json());

import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);



app.listen(process.env.PORT, () => {
    console.log("Server Running on Port 3000")
})



