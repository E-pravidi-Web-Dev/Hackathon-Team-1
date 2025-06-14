import connectToDb from "@/lib/db";
import { handleError } from "@/lib/error";
import { errorResponse } from "@/lib/response";
import User from "@/models/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectToDb()
    const { email, password } = await req.json();

    try {
        const user = await User.findOne({ email })
        if (!user) return errorResponse("User not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return errorResponse("Wrong credentials")

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        return NextResponse.json({
            message: "Logged in successfully",
            token
        })

    } catch (err: unknown) {
        return handleError(err)
    }

}