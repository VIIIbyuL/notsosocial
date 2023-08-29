import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const PostRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: true,
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
  viewLikes: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input: { postId }, ctx }) => {
      const likes = await ctx.prisma.like.findMany({
        where: {
          postId: postId,
        },
      });

      // Fetch the author's name for each like
      const likesWithAuthors = await Promise.all(
        likes.map(async (like) => {
          const author = await ctx.prisma.user.findUnique({
            where: {
              id: like.authorId,
            },
            select: {
              name: true, // Include the author's name
            },
          });
          return {
            ...like,
            author: author,
          };
        })
      );

      return likesWithAuthors;
    }),
  addComment: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        contents: z.string(),
      })
    )
    .mutation(async ({ input: { postId, contents }, ctx }) => {
      const userId = ctx.session?.user.id;

      const comment = await ctx.prisma.comment.create({
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
          contents: contents,
        },
      });

      return comment;
    }),
  viewComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input: { postId }, ctx }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId: postId,
        },
      });

      // Fetch the author's name for each comment
      const commentsWithAuthors = await Promise.all(
        comments.map(async (comment) => {
          const author = await ctx.prisma.user.findUnique({
            where: {
              id: comment.authorId,
            },
            select: {
              name: true, // Include the author's name
            },
          });
          return {
            ...comment,
            author: author,
          };
        })
      );

      return commentsWithAuthors;
    }),
});
