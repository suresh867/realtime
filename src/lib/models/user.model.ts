import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
export default UserModel