import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  fetchOptions: {
    credentials: "include", // 🔴 THIS IS THE FIX
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        image: { type: "string" },
      },
    }),
  ],
});
