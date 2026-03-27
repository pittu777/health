
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI || "");
        console.log(`mongodb connected: ${(await connection).connection.host}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}