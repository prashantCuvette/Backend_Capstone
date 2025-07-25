import mongoose from 'mongoose';



// database connection
//  first thing => db operations takes time => async-await
// second thing => possibility of error => try-catch

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");

    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;