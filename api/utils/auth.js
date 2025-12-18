import "dotenv/config";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { inferAdditionalFields } from "better-auth/client/plugins";

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
  
  trustedOrigins: [process.env.FRONTEND_URL],
});
