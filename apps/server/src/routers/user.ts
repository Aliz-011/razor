import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { protectedProcedure, router } from "../lib/trpc";
import { auth } from "../lib/auth";
import { dbAuth } from "../db";
import { accounts, users } from "../db/schema/auth";

export const usesRouter = router({
    updatePassword: protectedProcedure
        .input(z.object({
            oldPassword: z.string().min(1),
            newPassword: z.string().min(8, "Password must be at least 8 characters")
                .max(30, "Password cannot exceed 30 characters")
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
                    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                )
        }))
        .mutation(async ({ ctx: trpcCtx, input }) => {
            const session = trpcCtx.session.session

            if (!session) {
                throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
            }

            const { newPassword, oldPassword } = input
            const ctx = await auth.$context

            const [userAccount] = await dbAuth.select({ password: accounts.password }).from(accounts).where(eq(accounts.userId, session.userId))

            if (!userAccount.password) {
                throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
            }

            const checkPassword = await ctx.password.verify({ hash: userAccount.password, password: oldPassword })

            if (!checkPassword) {
                throw new TRPCError({ message: 'Old password do not matches', code: 'BAD_REQUEST' })
            }

            const hash = await ctx.password.hash(newPassword)
            await ctx.internalAdapter.updatePassword(session.userId, hash)

            return { message: 'Password updated successfully.' }
        }),
    updateProfile: protectedProcedure
        .input(z.object({
            nik: z
                .string()
                .min(5, { message: 'NIK must be at least 5 digits' })
                .max(8)
                .trim()
                .regex(/^\d+$/, { message: "NIK must contain only numbers" }),
            phoneNumber: z
                .string()
                .min(11, { message: 'Phone number must be at least 11 digits' })
                .max(13)
                .trim()
                .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
        }))
        .mutation(async ({ ctx: trpcCtx, input }) => {
            const session = trpcCtx.session.session

            if (!session) {
                throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
            }

            const { nik, phoneNumber } = input

            const [userAccount] = await dbAuth.select().from(accounts).where(eq(accounts.userId, session.userId))

            if (!userAccount.password) {
                throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
            }

            const [updatedUser] = await dbAuth.update(users).set({
                nik,
                phoneNumber
            }).where(eq(users.id, session.userId)).returning()

            if (!updatedUser) {
                throw new TRPCError({ message: 'Failed to update profile', code: 'BAD_REQUEST' })
            }

            return { message: 'Profile updated.' }
        })
})