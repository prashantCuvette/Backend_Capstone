import { Router } from "express";
import { createMemory } from "../controllers/memory.controller.js";
import upload from "../middlewares/multer.middleware.js";

const memoryRoutes = Router();

memoryRoutes.post("/", upload.single('image'),createMemory);

export default memoryRoutes