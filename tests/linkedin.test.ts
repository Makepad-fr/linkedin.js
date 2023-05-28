// TODO: Login and check if the browser context saved
/* TODO: Login and check if user logged in
    * Create browser context with the first login
    * Login again using the existing context
    * Check if the user logged in
*/
import LinkedIn from "../src";
import fs from 'fs';
import crypto from 'crypto';
   



describe('LinkedIn module', () => {
    let contextFilePath: string;
    let linkedIn: LinkedIn;
    
    let username: string;
    let password: string;

    beforeAll(() => {
        const u = process.env['LINKEDIN_USERNAME'];
        if (u === undefined) {
            throw new Error("LINKEDIN_USERNAME environment variable is missing");
        }
        const p = process.env['LINKEDIN_PASSWORD'];
        if (p === undefined) {
            throw new Error('LINKEDIN_PASSWORD environment variable is missing');
        }
        username = u;
        password = p;
    })

    beforeEach(async () => {
        contextFilePath = `./${crypto.randomUUID()}.json`;
        linkedIn = await LinkedIn.init({headless: true, contextPath: contextFilePath});
    })

    test('Check if login works', async () => {
        // Logging in to LinkedIn account
        await linkedIn.login(username, password);
        // Verify if the context path exists
        expect(fs.existsSync(contextFilePath)).toBeTruthy();
        // Verify if the user logged in
        expect(await linkedIn.isUserLoggedIn()).toBeTruthy();
    }, 600000);

    afterEach(async () => {
        if (fs.existsSync(contextFilePath)) {
            fs.rmSync(contextFilePath);
        }
        if (linkedIn) {
            await linkedIn.close();
        }
    })
  });