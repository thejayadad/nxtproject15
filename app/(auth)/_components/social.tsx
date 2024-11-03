
import { signIn } from "@/auth"
import {FcGoogle} from "react-icons/fc"
export const Social = async () => {
    return(
        <div className="flex items-center w-full gap-x-2">
            <form
            className="w-full"
                action={async () => {
                    'use server'
                    await signIn("google")
                }}
                >
            <button className="bg-white w-full p-2 border flex items-center justify-center space-x-2 rounded-lg">
                <span>Login With Google</span><FcGoogle className="h-5 w-5" />
            </button>
                </form>       
        </div>
    )
}

