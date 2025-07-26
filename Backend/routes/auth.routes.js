import { Router } from "express";

import { signup } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/signup", upload.single("profileImage"), signup);

export default router;