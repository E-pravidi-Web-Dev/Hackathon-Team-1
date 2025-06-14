import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
}, {
    timestamps: true
})

if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model("User", UserModel);

export default User;