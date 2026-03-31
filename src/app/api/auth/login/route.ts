
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { setAuthCookies } from "@/lib/auth/session";

export async function POST(request: Request) {
    try {

        await connectDB();

        const { email, password } = await request.json();

        const user = await userModel.findOne({ email }).select("+password");


        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const cookieStore = await cookies();
        setAuthCookies(cookieStore, { userId: user._id.toString() });

        return NextResponse.json({
            message: "Login successful",
        });




    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to login";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
