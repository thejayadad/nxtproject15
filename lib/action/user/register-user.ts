'use server'

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { hash } from "bcrypt-ts";


const register = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!name || !email || !password) {
      throw new Error("Please fill all fields");
    }
  
    await connectDB();
  
    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
  
    const hashedPassword = await hash(password, 12);
  
    await User.create({ name, email, password: hashedPassword });
    console.log(`User created successfully 🥂`);
    redirect("/login");
  };


  export {register}