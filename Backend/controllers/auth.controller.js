import User from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
// import fs from "fs";

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


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required",
                success: false
             });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", user, success: true, token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

// update your profile as well

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const { profileImage } = req.file;

        const getUser = await User.find({email});
        if(!getUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if(getUser.email !== email) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!fullName || !password) {
            return res.status(400).json({ message: "Field Cannot be empty" });
        }

        if (!profileImage) {
            return res.status(400).json({ message: "Profile image is required" });
        }

        const result = await uploadImage(profileImage.path);
        getUser.profileImage = result.secure_url; // user provided new image

        if(fullName) {
            getUser.fullName = fullName; // update in db as well
        }

        // if(email) {
        //     getUser.email = email; // update in db as well
        // }

        if(password) {
            getUser.password = password; // update in db as well
        }

        await getUser.save();

        res.status(200).json({ message: "Profile updated successfully", success: true, user: getUser });

    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
}

// delete all users


