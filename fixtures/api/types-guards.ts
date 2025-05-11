import { z } from 'zod';
import type {
    UserSchema,
    ErrorResponseSchema,
    ArticleResponseSchema,
} from './schemas';

/**
 * Parameters for making an API request.
 * @typedef {Object} ApiRequestParams
 * @property {'POST' | 'GET' | 'PUT' | 'DELETE'} method - The HTTP method to use.
 * @property {string} url - The endpoint URL for the request.
 * @property {string} [baseUrl] - The base URL to prepend to the endpoint.
 * @property {Record<string, unknown> | null} [body] - The request payload, if applicable.
 * @property {string} [headers] - Additional headers for the request.
 */
export type ApiRequestParams = {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | null;
    headers?: string;
};

/**
 * Response from an API request.
 * @template T
 * @typedef {Object} ApiRequestResponse
 * @property {number} status - The HTTP status code of the response.
 * @property {T} body - The response body.
 */
export type ApiRequestResponse<T = unknown> = {
    status: number;
    body: T;
};

// define the function signature as a type
export type ApiRequestFn = <T = unknown>(
    params: ApiRequestParams
) => Promise<ApiRequestResponse<T>>;

// grouping them all together
export type ApiRequestMethods = {
    apiRequest: ApiRequestFn;
};

export type User = z.infer<typeof UserSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type ArticleResponse = z.infer<typeof ArticleResponseSchema>;
