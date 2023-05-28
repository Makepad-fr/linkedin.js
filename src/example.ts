import LinkedIn from ".";

const LINKEDIN_USERNAME = process.env['LINKEDIN_USERNAME'];
const LINKEDIN_PASSWORD = process.env['LINKEDIN_PASSWORD'];
const LINKEDIN_PROFILE_ID = process.env[`LINKEDIN_PROFILE_ID`];

const AUTHENTICATION_CONTEXT_PATH = "./linkedin.json";

async function main() {

    const linkedIn = await LinkedIn.init({headless: false, contextPath: AUTHENTICATION_CONTEXT_PATH});
    // Login to LinkedIn account
    await linkedIn.login(LINKEDIN_USERNAME!, LINKEDIN_PASSWORD!);
    console.log('Is user logged in');

    console.log(await linkedIn.isUserLoggedIn());
    const profile = await linkedIn.profile(LINKEDIN_PROFILE_ID!);
    console.log('Full name');
    console.log(await profile.fullName);
    console.log('Headline');
    console.log(await profile.headline);
}

main().then();
