import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  // Email Password Auth
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "user", // user, librarian, admin
      },
    },
  },

  // SECURITY: `role` is a client-writable field via authClient.updateUser().
  // Without this guard, any logged-in user could open devtools and run
  // authClient.updateUser({ role: "admin" }) to instantly become an admin.
  // "admin" may only ever be granted through the trusted Express backend's
  // /api/users/role route (verifyAdmin-protected, used by the admin dashboard).
  databaseHooks: {
    user: {
      update: {
        before: async (data) => {
          if ("role" in data && data.role !== "user" && data.role !== "librarian") {
            const { role, ...safeData } = data;
            return { data: safeData };
          }
          return { data };
        },
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 3 * 24 * 60 * 60,
    },
  },

  plugins: [
    jwt(),
  ],

});