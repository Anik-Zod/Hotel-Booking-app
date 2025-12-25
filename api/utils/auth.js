import "dotenv/config";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
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
        input: false,
      },
      image: {
        type: "string",
        defaultValue: null,
        input: false,
      },
    },
  },

  // ————————— COOKIE SETTINGS —————————
  advanced: {
    // This applies to all Better Auth cookies (session, refresh, csrf, etc.)
    defaultCookieAttributes: {
      httpOnly: true,     // JS can’t access
      secure: true,       // REQUIRED for SameSite=None
      sameSite: "none",   // REQUIRED for cross‑site cookies
      path: "/",
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      overrideUserInfoOnSignIn: true,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  plugins: [
    admin({
      adminUserIds: ["693fc1771916a0b3074004c0"],
    }),
  ],

  trustedOrigins: [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
  ],
});
