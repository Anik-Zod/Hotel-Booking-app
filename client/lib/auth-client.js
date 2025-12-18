import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8800/api/auth",
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        image: { type: "string" },
      },
    }),
  ],


});
