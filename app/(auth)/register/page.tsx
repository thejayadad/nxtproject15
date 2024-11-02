import { register } from "@/lib/action/user/register-user";


export default function RegisterPage(){
    return (
        <div>
            <form
            action={register}
            >
                <input type="text" name="name" id="name" placeholder="Name..." />
                <input type="email" name="email" id="email" placeholder="Email..." />
                <input type="password" name="password" id="password" placeholder="Password..." />
                <button type="submit" >Register</button>
            </form>
        </div>
    )
}