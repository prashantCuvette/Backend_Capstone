import Memory from "../models/memory.model.js";
import { uploadImage } from "../utils/cloudinary.js";


// users email, id from frontend ??
export const createMemory = async (req, res) => {
    // console.log(req.file)
    try {
        const { title, description } = req.body;
        const file = req.file;

        if (!title || !description || !file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload image to cloud
        const result = await uploadImage(file.path);

        // console.log(title, description, result.secure_url);
        // console.log(req.user);

        // Create memory
        const memory = new Memory({
            title,
            description,
            image: result.secure_url,
            user: req.user.userId
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
export const getMemories = async (req, res) => {
    try {

        console.log(req.user)

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        // parseInt() vs Number()

        const userId = req.user.userId;

        // page = 2 limit = 8
        // 2 - 1 => 1 * 8 =8

        // page = 3 limit = 8
        // 3 - 1 => 2 * 8 = 16



        // very logical
        const skip = (page - 1) * limit;

        const query1 = Memory.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const query2 = Memory.countDocuments({ user: userId });

        const memories = await query1;
        const totalCount = await query2;

        // const [memories, totalCount] = await Promise.all([query1, query2])

        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({ success: true, message: "Fetch Successful", memories, totalPages, currentPage: page });


    } catch (error) {
        res.status(500).json({ success: false, message: "cannot Get", error: error.message })
    }
};



// update memory
export const updateMemory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const memory = await Memory.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!memory) {
            return res.status(404).json({ message: "Memory not found", success: false });
        }

        res.status(200).json({ message: "Memory updated successfully", success: true, memory });
    } catch (error) {
        res.status(500).json({ message: "Error updating memory", error: error.message });
    }
};


// delete memory as homework
export const deleteMemory = async (req, res) => {
    try {
        const { id } = req.params;

        const memory = await Memory.findByIdAndDelete(id);

        if (!memory) {
            return res.status(404).json({ message: "Memory not found", success: false });
        }

        res.status(200).json({ message: "Memory deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error deleting memory", error: error.message });
    }
};

// delete single memory
// need some kind of unique identification
// _id
// send it from the client