import { z } from "zod";

const usernameRegex = /^[a-z][a-zA-Z0-9.]*$/;

export const OnboardingValidationSchema = z.object({
    userId: z.string(),
    username: z.string()
        .min(4, {
            message: "Username must be at least 2 characters.",
        })
        .regex(usernameRegex, {
            message: "Username must start with a lowercase letter and can only contain lowercase and uppercase letters, numbers, and the '.' character.",
        }),
    fullName: z.string().min(5, {
        message: "Fullname must be at least 3 characters.",
    }),
    email: z
        .string()
        .email({
            message: "Invalid email address."
        }),
})