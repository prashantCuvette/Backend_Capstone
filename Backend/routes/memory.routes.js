import { Router } from "express";
import { createMemory, getMemory, getMemories, updateMemory, deleteMemory } from "../controllers/memory.controller.js";
import upload from "../middlewares/multer.middleware.js";
import {getAnalytics, getAllUsers, deleteuser} from "../controllers/admin.controller.js"

import { authenticate } from "../middlewares/auth.middleware.js";

const memoryRoutes = Router();

// admin routes

memoryRoutes.get("/admin/analytics", authenticate, getAnalytics);
memoryRoutes.get("/admin/users", authenticate, getAllUsers);
memoryRoutes.delete("admin/users/:userId", authenticate, deleteuser);



memoryRoutes.post("/", authenticate, upload.single('image'),createMemory);
memoryRoutes.get("/", getMemories);
memoryRoutes.get("/:", getMemory);
memoryRoutes.put("/:", authenticate, updateMemory);
memoryRoutes.delete("/:", authenticate, deleteMemory);

// /:
// /check

export default memoryRoutes;