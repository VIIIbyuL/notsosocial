/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";
import { inferAsyncReturnType } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();
    return posts;
  }),
  
});
