import connectToDb from "@/lib/db"
import { handleError } from "@/lib/error"
import { errorResponse, successResponse } from "@/lib/response"
import User from "@/models/User"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    await connectToDb()
    const { name, email, password } = await req.json()

    try {
        if (!name || !email || !password) return errorResponse("Please provide all fields")

        const checkEmail = await User.findOne({ email })
        if (checkEmail) return errorResponse("User with this email already exists")

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()
        return successResponse("Account created successfully")
    } catch (err) {
        return handleError(err)
    }

}