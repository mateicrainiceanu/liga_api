import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export {userSchema};
export default User;