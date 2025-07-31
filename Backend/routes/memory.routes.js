import { Router } from "express";
import { createMemory, getMemory, getMemories, updateMemory, deleteMemory } from "../controllers/memory.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { getAnalytics, getAllUsers, deleteuser } from "../controllers/admin.controller.js"

import { authenticate } from "../middlewares/auth.middleware.js";

const memoryRoutes = Router();

// admin routes
memoryRoutes.get("/admin/analytics", authenticate, getAnalytics);
memoryRoutes.get("/admin/users", authenticate, getAllUsers);
memoryRoutes.delete("/admin/users/:userId", authenticate, deleteuser); // Fixed: Added leading slash

// user routes
memoryRoutes.post("/", authenticate, upload.single('image'), createMemory);
memoryRoutes.get("/", getMemories);
memoryRoutes.get("/:id", getMemory);           // Fixed: Added parameter name 'id'
memoryRoutes.put("/:id", authenticate, updateMemory);      // Fixed: Added parameter name 'id'
memoryRoutes.delete("/:id", authenticate, deleteMemory);   // Fixed: Added parameter name 'id'

export default memoryRoutes;