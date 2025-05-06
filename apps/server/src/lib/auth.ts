
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";

import { dbAuth } from "../db";
import * as schema from "../db/schema/auth";

export const auth = betterAuth({
  database: drizzleAdapter(dbAuth, {
    provider: "sqlite",
    schema: schema,
    usePlural: true
  }),
  trustedOrigins: [
    process.env.CORS_ORIGIN || "",
    "http://localhost:3001",
    "http://10.113.4.55"
  ],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      nik: {
        unique: true,
        input: false,
        type: "string",
      },
      phoneNumber: {
        unique: true,
        input: false,
        type: "string",
        fieldName: 'phone_number',
        returned: true
      }
    }
  },
  advanced: {
    ipAddress: {
      disableIpTracking: false
    },
    cookies: {
      session_token: {
        name: 'razor_session'
      }
    },
    useSecureCookies: false
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    disableSessionRefresh: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              displayName: user.name
            }
          }
        }
      }
    }
  },
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 20
    }),
    reactStartCookies()
  ],
});

type Session = typeof auth.$Infer.Session