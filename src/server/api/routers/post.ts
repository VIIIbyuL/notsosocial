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
  createPost: publicProcedure
    .input(
      z.object({
        contents: z.string(),
      })
    )
    .mutation(async ({ input: { contents }, ctx }) => {
      const userId = ctx.session?.user.id;
      //   const user = await ctx.prisma.user.findUnique({
      //     where: { id: userId },
      //   });
      const post = await ctx.prisma.post.create({
        data: {
          author: {
            connect: {
              id: userId,
            },
          },
          contents: contents,
        },
      });
    }),
});
