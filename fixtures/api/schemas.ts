import { z } from 'zod';

export const UserSchema = z.object({
    user: z.object({
        email: z.string().email(),
        username: z.string(),
        bio: z.string().nullable(),
        image: z.string().nullable(),
        token: z.string(),
    }),
});
