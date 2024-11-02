import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorEmail: {type: String},
    createdAt: { type: Date, default: Date.now },
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
