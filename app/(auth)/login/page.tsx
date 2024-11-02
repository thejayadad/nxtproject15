import { auth, signIn } from "@/auth";
import { userLogin } from "@/lib/action/user/login-user";

export default async function LoginPage(){
    const session = await auth()
    console.log("session ", session)
    return (
        <div>
            <form
            action={userLogin}
            className="flex flex-col"
            >
            <input type="email" name="email" id="email" placeholder="Email..." />
            <input type="password" name="password" id="password" placeholder="Password..." />
            <button type="submit">Login</button>
            </form>

            <div className="pt-12">
                <h2>Google Account?</h2>
                <form
                action={async () => {
                    'use server'
                    await signIn("google")
                }}
                >
                <button type="submit">Login With Google</button>
                </form>
            </div>
        </div>
    )
}