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

export const ErrorResponseSchema = z.object({
    errors: z.object({
        email: z.array(z.string()).optional(),
        username: z.array(z.string()).optional(),
        password: z.array(z.string()).optional(),
    }),
});

export const ArticleResponseSchema = z.object({
    article: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        body: z.string(),
        tagList: z.array(z.string()),
        createdAt: z.string(),
        updatedAt: z.string(),
        favorited: z.boolean(),
        favoritesCount: z.number(),
        author: z.object({
            username: z.string(),
            bio: z.string().nullable(),
            image: z.string(),
            following: z.boolean(),
        }),
    }),
});
