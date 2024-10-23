import NextAuth from "next-auth";
import CredentialsProvidor from "next-auth/providers/credentials"
import mongoClientPromise from "./lib/db";
import { userModel } from "@/backend/models/userModel";
// import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
export const {handlers,signIn}=NextAuth({
    session: {
        strategy: "jwt",
        // maxAge:''
      },
      adapter: MongoDBAdapter(mongoClientPromise, {
        databaseName: process.env.ENVIRONMENT,
      }),
    providers:[
      CredentialsProvidor({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          if (!credentials) return null;
          try {
            const user = await userModel.findOne({ email: credentials?.email });
            console.log(user)
            if (user) {
              // const isMatch = bcrypt.compare(
              //   user?.password,
              //   credentials?.password
              // );
  
              const isMatch =true
              if (isMatch) {
                return user;
              } else {
                throw new Error("Credentials not match");
              }
            } else {
              throw new Error("User Not found");
            }
          } catch (error) {}
  
          // return user object with the their profile data
          return user;
        },
      }),
        
    ]
})