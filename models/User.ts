import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  image: { type: String },
  authProviderId: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Array of posts created by the user
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);