import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const ProfileRouter = createTRPCRouter({
  viewProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const profile = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return profile;
  }),
  editProfile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input: { name, email, image }, ctx }) => {
      const userId = ctx.session.user.id;
      const profile = await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          image,
        },
      });
      return profile;
    }),
  findProfile: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input: { name }, ctx }) => {
      const profile = await ctx.prisma.user.findMany({
        where: {
          name: name,
        },
      });
      return profile;
    }),
  deleteProfile: publicProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const profile = await ctx.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return profile;
  }),
  followProfile: protectedProcedure
    .input(
      z.object({
        userIdToFollow: z.string(),
      })
    )
    .mutation(async ({ input: { userIdToFollow }, ctx }) => {
      const followerId = ctx.session.user.id;

      if (followerId === userIdToFollow) {
        throw new Error("You cannot follow yourself.");
      }

      const user = await ctx.prisma.user.update({
        where: {
          id: followerId,
        },
        data: {
          following: {
            connect: {
              id: userIdToFollow,
            },
          },
        },
      });
      return user;
    }),
});
