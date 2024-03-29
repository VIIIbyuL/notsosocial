import { createTRPCRouter } from "~/server/api/trpc";
import { ProfileRouter } from "./routers/profile";
import { PostRouter } from "./routers/post";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  profile: ProfileRouter,
  post: PostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
