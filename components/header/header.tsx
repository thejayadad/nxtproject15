import { auth, signOut } from "@/auth"





export async function  Header(){
    const session = await auth()
    const user = session?.user
    return (
        <header className="w-full border-b h-20 flex items-center">
            <nav className="flex justify-between mx-auto max-w-screen-xl w-full p-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-600">Logo</h1>
                </div>
                <div>
                {user ? (
                        <div className="flex items-center space-x-2">
                            <p className="text-gray-600 cursor-pointer">{user.email}</p>
                    <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                    >
                    <button type="submit">
                        Logout
                    </button>
            </form>
                        </div>
                    ) : (
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    )}
                </div>
            </nav>
        </header>
    )
}