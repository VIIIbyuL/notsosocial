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
    const posts = await ctx.prisma.post.findMany({
      include: {
        author: true,
      },
    });
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
  likePost: publicProcedure
    .input(
      z.object({
        postId: z.string(), // Input schema with postId
      })
    )
    .mutation(async ({ input: { postId }, ctx }) => {
      const userId = ctx.session?.user.id;

      // Check if the post exists
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new Error("Cannot find the post to like");
      }

      // const likeWhereUniqueInput: LikeWhereUniqueInput = {
      //   authorId: userId,
      //   postId: postId, // Replace with the actual post ID
      // };

      // if (existingLike) {
      //   throw new Error("You have already liked this post");
      // }

      // Create a new like record in the database if not exist
      const like = await ctx.prisma.like.create({
        data: {
          author: {
            connect: {
              id: userId,
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
