import LinkedIn from ".";

const LINKEDIN_USERNAME = process.env['LINKEDIN_USERNAME'];
const LINKEDIN_PASSWORD = process.env['LINKEDIN_PASSWORD'];
const AUTHENTICATION_CONTEXT_PATH = "./linkedin.json";

async function main() {

    const linkedIn = await LinkedIn.init({headless: false, contextPath: AUTHENTICATION_CONTEXT_PATH});
    // Login to LinkedIn account
    await linkedIn.login(LINKEDIN_USERNAME!, LINKEDIN_PASSWORD!);
}

main().then();
