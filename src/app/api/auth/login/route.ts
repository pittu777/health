
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {

        await connectDB();

        const { email, password } = await request.json();

        const user = await userModel.findOne({ email }).select("+password");


        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        })

        return NextResponse.json({
            message: "Login successful",
        });




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}