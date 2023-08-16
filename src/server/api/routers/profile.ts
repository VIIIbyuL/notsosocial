/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";
import { inferAsyncReturnType } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Prisma } from "@prisma/client";

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
});
