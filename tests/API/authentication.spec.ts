import { ErrorResponseSchema } from '../../fixtures/api/schemas';
import { ErrorResponse } from '../../fixtures/api/types-guards';
import { test, expect } from '../../fixtures/pom/test-options';
import invalidCredentials from '../../test-data/invalidCredentials.json';

test.describe('Verify API Validation for Log In / Sign Up', () => {
    test(
        'Verify API Validation for Log In',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            const { status, body } = await apiRequest<ErrorResponse>({
                method: 'POST',
                url: 'api/users/login',
                baseUrl: process.env.API_URL,
                body: {
                    user: {
                        email: invalidCredentials.invalidEmails[0],
                        password: invalidCredentials.invalidPasswords[0],
                    },
                },
            });

            expect(status).toBe(403);
            expect(ErrorResponseSchema.parse(body)).toBeTruthy();
        }
    );

    test(
        'Verify API Validation for Sign Up',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            await test.step('Verify API Validation for Invalid Email', async () => {
                for (const invalidEmail of invalidCredentials.invalidEmails) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'api/users',
                        baseUrl: process.env.API_URL,
                        body: {
                            user: {
                                email: invalidEmail,
                                password: '8charact',
                                username: 'testuser',
                            },
                        },
                    });

                    expect(status).toBe(422);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });

            await test.step('Verify API Validation for Invalid Password', async () => {
                for (const invalidPassword of invalidCredentials.invalidPasswords) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'api/users',
                        baseUrl: process.env.API_URL,
                        body: {
                            user: {
                                email: 'validEmail@test.com',
                                password: invalidPassword,
                                username: 'testuser',
                            },
                        },
                    });

                    expect(status).toBe(422);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });

            await test.step('Verify API Validation for Invalid Email', async () => {
                for (const invalidUsername of invalidCredentials.invalidUsernames) {
                    const { status, body } = await apiRequest<ErrorResponse>({
                        method: 'POST',
                        url: 'api/users',
                        baseUrl: process.env.API_URL,
                        body: {
                            user: {
                                email: 'validEmail@test.com',
                                password: '8charact',
                                username: invalidUsername,
                            },
                        },
                    });

                    expect(status).toBe(422);
                    expect(ErrorResponseSchema.parse(body)).toBeTruthy();
                }
            });
        }
    );
});
