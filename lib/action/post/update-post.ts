"use server";

import connectDB from "@/lib/db";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";

const updatePost = async (formData: FormData) => {
    const postId = formData.get("postId") as string; // Get the post ID from the form data
    const title = formData.get("title") as string || ''; // Default to an empty string if null
    const description = formData.get("description") as string || ''; // Default to an empty string if null
    const authorEmail = formData.get("authorEmail") as string || ''; // Default to an empty string if null

    await connectDB();
    console.log("Form Data:", { postId, title, description, authorEmail });

    try {
        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }

        // Find the user by email
        const user = await User.findOne({ email: authorEmail });
        if (!user) {
            throw new Error("User not found");
        }

        // Update the post
        post.title = title;
        post.description = description;
        const updatedPost = await post.save(); // Save the updated post
        revalidatePath("/")
        return JSON.parse(JSON.stringify(updatedPost)); // Ensure plain data is returned
    } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post");
    }
};

export default updatePost;
