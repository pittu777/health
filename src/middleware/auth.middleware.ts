import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const protect = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer")) {
            return NextResponse.json({
                status: "fail",
                message: "Please login to get access"
            }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        const currentUser = await userModel.findById(decoded.id).select("-password");

        if (!currentUser) {
            return NextResponse.json({
                status: "fail",
                message: "The user belonging to this token no longer exists"
            }, { status: 401 });
        }


        req.user = {
            id: currentUser._id.toString(),
            email: currentUser.email
        };

        return NextResponse.next();
    } catch {
        return NextResponse.json({
            status: "fail",
            message: "Invalid token or internal server error"
        }, { status: 401 });
    }
}
