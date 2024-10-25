import mongoose, { Types } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    authorId: {type: Types.ObjectId, required: true}
});

const Post = mongoose.model("Post", postSchema);

export default Post;