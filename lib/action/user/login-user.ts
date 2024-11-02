'use server'

import { signIn } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";


const userLogin = async (formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
    
      try {
        await signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email,
          password,
        });
      } catch (error) {
        const someError = error as CredentialsSignin;
        return someError.cause;
      }
      redirect("/");
    };


    export {userLogin}