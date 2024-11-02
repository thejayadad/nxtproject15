"use server";

import connectDB from "@/lib/db";
import { Post } from "@/models/Post";
import { User } from "@/models/User";

const addPost = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorEmail = formData.get("authorEmail") as string; // Corrected spelling here
    await connectDB();
    console.log("Form Data:", { title, description, authorEmail });

    try {
        // Find the user by email
        const user = await User.findOne({ email: authorEmail });

        if (!user) {
            throw new Error("User not found");
        }

        // Create the new post
        const newPost = await Post.create({
            title,
            description,
            authorEmail: user, // Associate post with the user’s email
        });

        // Add the post ID to the user's posts array
        user.posts.push(newPost._id);
        await user.save();

        return JSON.parse(JSON.stringify(newPost)); // Ensure plain data is returned
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
};

export default addPost;
