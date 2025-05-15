"use server"

import UserModel from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import { connectToDb } from "../utils/connectToDb";

interface CreateUserProps {
    userData: UserForm;
}
export const createUser = async ({
    userData,
}: CreateUserProps) => {
    await connectToDb()
    try {
        const createdUser = await UserModel.create({
            userId: userData.userId,
            username: userData.username,
            email: userData.email,
            fullName: userData.fullName,
        })
        if (!createdUser) return { status: "something went wrong" }
        const notVerifiedUsers = await UserModel.find({
            isVerified: false
        })
        if (!notVerifiedUsers) return { status: "something went wrong" };
        const notVerifiedUsersCount = notVerifiedUsers.length
        revalidatePath('/admin-dashboard/')
        revalidatePath('/admin-dashboard/users')
        return { status: "200 OK", notVerifiedUsersCount: notVerifiedUsersCount }
    } catch (error) {
        console.log("User creation error:\n")
        console.log("Error: ", error)
        return { status: "something went wrong" }
    }
}