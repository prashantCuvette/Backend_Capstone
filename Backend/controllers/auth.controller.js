import User from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
    const { fullName, email, password } = req.body;
    // console.log(req.body);

    if(!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!req.file) {
        return res.status(400).json({ message: "Profile image is required" });  
    }

    // user may already exist
    const existingUser = await User.findOne({email}); // db opeartion
    if(existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // upload image to cloudinary
    // console.log(req.file)
    const profileImage = await uploadImage(req.file.path);
    console.log(profileImage)

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


