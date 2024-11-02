import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { User } from "./models/User";
import { compare } from "bcrypt-ts";
import Google from "next-auth/providers/google";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        async profile(profile) {
          // You can customize the user object returned here
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture, // Use the correct property for the image
          };
        },
      }),
    Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const email = credentials.email as string | undefined;
          const password = credentials.password as string | undefined;
  
          if (!email || !password) {
            throw new CredentialsSignin("Please provide both email & password");
          }
  
          await connectDB();
  
          const user = await User.findOne({ email }).select("+password +role");
  
          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }
  
          const isMatched = await compare(password, user.password);
  
          if (!isMatched) {
            throw new Error("Password did not match");
          }
          
          const userData = {
            name: user.name,
            email: user.email,
            id: user._id
          }
          return userData
        },
      }),
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            // Create a new user 
            await User.create({ email, name, image, authProviderId: id,  });
          }
        } catch (error) {
          console.error("Error while creating user:", error);
          throw new Error("Error while creating user");
        }
      }
      return true; // Always return true to continue the sign-in process
    },
  },
})