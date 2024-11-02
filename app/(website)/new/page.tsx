import { auth } from "@/auth";
import addPost from "@/lib/action/post/add-post";
import { redirect } from "next/navigation";

export default async function NewPost() {
    const session = await auth()
    if(!session){
        redirect("/login")
    }
    const userEmail = session?.user?.email
    return (
      <div>
        <form
        action={addPost}
        >
            <input hidden name="authorEmail" id="authorEmail" defaultValue={userEmail} />
            <input name="title" id="title" placeholder="Title..." />
            <textarea name="description" id="description" placeholder="Description..." />
            <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
  