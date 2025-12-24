import "dotenv/config";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // user shouldn’t provide directly
      },
      image: {
        type: "string",
        defaultValue: null,
        input: false,
      },
    },
  },
  
  cookies: {
  session: {
    name: "better-auth.session",
    options: {
      httpOnly: true,
      secure: false,           // Set to false for local development
      sameSite: "lax",         // Set to "lax" for local development
      path: "/",
    },
  },
},


  socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    overrideUserInfoOnSignIn: true,
  },
},


  session: {
    expiresIn: 60 * 60 * 24 * 7, // seconds → 7 days
  },
  
   plugins: [admin({
    adminUserIds:["693fc1771916a0b3074004c0"]
   })],
  trustedOrigins: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
});
