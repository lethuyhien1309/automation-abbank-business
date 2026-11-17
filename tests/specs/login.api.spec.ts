import { expect, test } from '@playwright/test';
let accessToken: string;
test.describe('Login success', () => {
    test('Login with user admin', async ({ request }) => {
        const response = await request.post('https://business-id-sit2.abbank.vn/auth/realms/master/protocol/openid-connect/token', {
            data: {
                "username": process.env.User_Name!,
                "password": process.env.User_PASSWORD!
            }
        });
        const responseInfoAdmin = await response.json();
        console.log(responseInfoAdmin);
        expect(response.status()).toBe(200);

    })
});