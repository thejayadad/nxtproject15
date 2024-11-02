import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to Post
    authorEmail: { type: String, required: true, ref: "User" }, // Reference to User by email
    createdAt: { type: Date, default: Date.now },
  });
export const Comment = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);