import { test as base } from '@playwright/test';
import { apiRequest as apiRequestOriginal } from './plain-function';
import {
    ApiRequestFn,
    ApiRequestMethods,
    ApiRequestParams,
    ApiRequestResponse,
} from './types-guards';

export const test = base.extend<ApiRequestMethods>({
    /**
     * Provides a function to make API requests.
     *
     * @param {object} request - The request object.
     * @param {function} use - The use function to provide the API request function.
     */
    apiRequest: async ({ request }, use) => {
        const apiRequestFn: ApiRequestFn = async <T = unknown>({
            method,
            url,
            baseUrl,
            body = null,
            headers,
        }: ApiRequestParams): Promise<ApiRequestResponse<T>> => {
            const response = await apiRequestOriginal({
                request,
                method,
                url,
                baseUrl,
                body,
                headers,
            });

            return {
                status: response.status,
                body: response.body as T,
            };
        };

        await use(apiRequestFn);
    },
});
