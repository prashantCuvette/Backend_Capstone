import Memory from "../models/memory.model.js";
import upload from "../middlewares/multer.middleware.js";


// users email, id from frontend ??
export const createMemory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { image } = req.file;

        if(!title || !description || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const result = await uploadImage(image.path);
        const memory = new Memory ({
            title,
            description,
            image: result.secure_url,
            user: req.user.id // needs to be sent from the client
        });

        await memory.save();

        res.status(201).json({ message: "Memory created successfully", success: true, memory });

    } catch (error) {
        res.status(500).json({ message: "Error creating memory", error: error.message });
    }
}





// get single memory
// user will send a id 



// get all memories
// user will send his email or _id



// delete memory as homework

// delete single memory
// need some kind of unique identification
// _id
// send it from the client