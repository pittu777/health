import userModel from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/db";


export async function POST(request: Request) {
    try {

        await connectDB()

        const { name, email, password } = await request.json();

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) return NextResponse.json({ error: "user exists" }, { status: 400 });
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name, email, password: hashedPassword,
        })

        return NextResponse.json({ message: "User created", newUser })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}