import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorEmail: { type: String, required: true, ref: "User" }, // Reference to User by email
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Array of comments related to this post
    createdAt: { type: Date, default: Date.now },
  });
  
  export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);