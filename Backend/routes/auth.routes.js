import { Router } from "express";
import { signup, login, updateProfile, deleteUser } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", upload.single("profileImage"), signup);  // jwt not issued here
router.post("/login", login); // jwt issued here

// WE WILL AUTHENTICATE THE USER BECAUSE JWT HAS ALREADY BEEN ISSUED

router.put("/profile", authenticate, upload.single("profileImage"), updateProfile);
router.delete("/delete", authenticate, deleteUser);

export default router;