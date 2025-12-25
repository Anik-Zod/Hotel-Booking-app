import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${import.meta.env.VITE_BACKEND_AUTH_URL}/api/auth`,
    fetchOptions: {
    credentials: 'include'   // Important for cookie transport
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
