"use server"

import UserModel from "@/lib/models/user.model";
import { connectToDb } from "../utils/connectToDb";

export const getUserNames = async () => {
    await connectToDb();
    const usernames = await UserModel.find().distinct("username");
    return usernames;
}