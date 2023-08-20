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
      return post;
    }),
  addLike: publicProcedure.query(async ({ input, ctx }) => {
    if (typeof input !== "object" || input === null || !("postId" in input)) {
      throw new Error("Invalid input");
    }

    const { postId } = input as { postId: string };

    const post = await ctx.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Cannot find post");
    }

    const like = await ctx.prisma.like.create({
      data: {
        author: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    return like;
  }),
});
