"use server";

import connectDB from "@/lib/db";
import { Post } from "@/models/Post";

const addPost = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorEmail = formData.get("authorEmail") as string; // Corrected spelling here
    await connectDB();
    console.log("Form Data:", { title, description, authorEmail });

    try {

        // Create the new post
        const newPost = await Post.create({
            title,
            description,
            authorEmail 
        });

        return JSON.parse(JSON.stringify(newPost)); // Ensure plain data is returned
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
};

export default addPost;
