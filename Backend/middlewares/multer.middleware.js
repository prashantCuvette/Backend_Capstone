import multer from "multer";

const storage = multer.memoryStorage(); // ✅ Changed from diskStorage to memoryStorage

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;



// This middleware can be used in routes to handle file uploads
// Example: app.post('/upload', upload.single('file'), (req, res) =>