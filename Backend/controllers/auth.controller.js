import User from "../models/user.model.js";
import Memory from "../models/memory.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
// import fs from "fs";

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log(req.body);

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        // user may already exist
        const existingUser = await User.findOne({ email }); // db opeartion
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // upload image to cloudinary
        // console.log(req.file)
        const profileImage = await uploadImage(req.file.buffer);
        console.log(profileImage)

        // fs.unlinkSync(req.file.path);

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is a good number for salt rounds

        // create new user
        const newUser = new User({ fullName, email, password: hashedPassword, profileImage: profileImage.secure_url });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });


    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

// import jwt from "jsonwebtoken"
export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", user, success: true, token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

// update your profile as well

export const updateProfile = async (req, res) => {
    try {
        console.log(req.user);
        const { fullName, email, password } = req.body;
        const file = req.file;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!fullName || !password) {
            return res.status(400).json({ message: "Field cannot be empty" });
        }

        if (!file) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        // Upload new profile image
        const result = await uploadImage(file.path);
        user.profileImage = result.secure_url;

        // Update name
        user.fullName = fullName;

        // Hash and update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
};


// delete user along with the memories
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete all memories of the user
        await Memory.deleteMany({ user: user._id });

        // Delete the user as well
        await User.findByIdAndDelete(user._id);

        res.status(200).json({
            message: "User and all associated memories deleted successfully",
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message,
        });
    }
};
