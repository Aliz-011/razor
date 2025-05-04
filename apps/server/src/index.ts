import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { csrf } from "hono/csrf";
import path from "path"

import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { auth } from "./lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null
  }
}>();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: [process.env.CORS_ORIGIN || "", "http://localhost:8080"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return await next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return await next();
});
app.use(csrf())

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use("/trpc/*", trpcServer({
  router: appRouter,
  createContext: (_opts, context) => {
    return createContext({ context });
  },
}));

app.use("/*", serveStatic({
  root: path.resolve(__dirname, '../../apps/web/dist')
}))

app.get('/*', serveStatic({
  root: path.resolve(__dirname, '../../apps/web/dist'),
  path: 'index.html'
}));

app.get("/", (c) => {
  return c.text("OK");
});

export default {
  port: 3000,
  fetch: app.fetch
}
