"use server"

import UserModel from "@/lib/models/user.model";
import { connectToDb } from "../utils/connectToDb";

export const getUser = async (userId: string) => {
    await connectToDb();
    const userData = await UserModel.findOne({ userId });
    if (!userData) return { message: "404" }
    const formatedUserData: User = {
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        imageUrl: userData.imageUrl,
        createdAt: new Date(userData.createdAt).toISOString(),
    }
    return formatedUserData;
}