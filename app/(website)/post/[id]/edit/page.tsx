import { auth } from "@/auth";
import updatePost from "@/lib/action/post/update-post";
import { Post } from "@/models/Post";
import { redirect } from "next/navigation";
import * as React from 'react'


interface Params {
    params: {
        id: string; // Define the type for the post ID
    };
}

export default async function EditPostPage({ params }: Params) {
    const session = await auth(); // Await the auth session
    if (!session) {
        redirect("/login"); // Redirect if not authenticated
    }

    const userEmail = session.user?.email; // Get user email from session
    const { id } = await params

    // Fetch the post using the post ID
    const post = await Post.findById(id); // Use id directly

    if (!post) {
        throw new Error("Post not found");
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <form action={updatePost}>
                <input type="hidden" name="postId" value={post.id} />
                <input type="hidden" name="authorEmail" value={userEmail || ''} /> {/* Ensure it's a string */}
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        placeholder="Title..."
                        defaultValue={post.title} // Pre-fill the title
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description..."
                        defaultValue={post.description} // Pre-fill the description
                        required
                    />
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}
