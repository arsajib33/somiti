import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoClientPromise from "./lib/mongoClinetPromise";
import { dbConnect } from "./lib/mongo";
import {userModel} from "@/backend/models/userModel"
import { authConfig } from "./auth.config";
export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
  debug: true, 
    adapter: MongoDBAdapter(mongoClientPromise, {databaseName: process.env.ENVIRONMENT}),

    ...authConfig,
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
            if (credentials == null) return null;

            try {
           await   dbConnect()
                const user = await userModel.findOne({
                    email: credentials?.email,
                });
                console.log(user);

                if (user) {
                    const isMatch =(
                        credentials.password== user.password
                    )

                    if (isMatch) {
                        return user;
                    } else {
                        console.error("password mismatch");
                        throw new Error("Check your password");
                    }
                } else {
                    console.error("User not found");
                    throw new Error("User not found");
                }
            } catch (err) {
                console.error(err);
                throw new Error(err);
            }
        },
    }),
    ],
});