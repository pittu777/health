
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import userModel from "@/models/user.model";
import { connectDB } from "@/config/db";

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        await connectDB();
        const user = await userModel.findById(decoded.id).select("-password");

        return user;
    } catch (error) {
        return null;
    }
}
