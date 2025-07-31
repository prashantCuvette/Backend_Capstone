import Memory from "../models/memory.model.js";
import { uploadImage } from "../utils/cloudinary.js";


// users email, id from frontend ??
export const createMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        if (!title || !description || !file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload image to cloud
        const result = await uploadImage(file.path);

        // Create memory
        const memory = new Memory({
            title,
            description,
            image: result.secure_url,
            user: req.user.id
        });

        await memory.save();

        res.status(201).json({ message: "Memory created successfully", success: true, memory });

    } catch (error) {
        res.status(500).json({ message: "Error creating memory", error: error.message });
    }
};





// get single memory
// user will send a id

export const getMemory = () => { };



// get all memories
// user will send his email or _id
export const getMemories = () => { };


// update memory
export const updateMemory = () => { };


// delete memory as homework
export const deleteMemory = () => { };

// delete single memory
// need some kind of unique identification
// _id
// send it from the client