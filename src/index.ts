
import { Browser, BrowserContext, Page, firefox } from 'playwright-core';
import fs from 'fs'
import { ACCEPT_COOKIES_BUTTON_SELECTOR, LOGIN_PASSWORD_INPUT_SELECTOR, LOGIN_SUBMIT_BUTTON_SELECTOR, LOGIN_USER_NAME_INPUT_SELECTOR } from './selectors';

const BASE_URL = 'https://www.linkedin.com/';
const LOGIN_URL = `${BASE_URL}login/`
const FEED_URL = `${BASE_URL}feed/`

export default class LinkedIn {

    readonly #browser: Browser;
    readonly #context: BrowserContext;
    readonly #browserContextPath: string | undefined;

    #page: Page;


    /**
     * Creates a new instance of LinkedIn with given parameters
     * @param browser The browser instance
     * @param page The current page instance
     * @param context The current browser context instance
     * @param browserContextPath The path to save and load the browser context
     */
    private constructor(browser: Browser, page: Page, context: BrowserContext, browserContextPath: string | undefined) {
        this.#browser = browser;
        this.#page = page;
        this.#context = context;
        this.#browserContextPath = browserContextPath;
    }

    /**
     * Creates a new instance of LinkedIn
     * @param headless A boolean indicating that if the execution will be done in headless mode or not. 
     * @param browserContextPath The path of the existing browser context
     */
    public static async init({ headless, contextPath: browserContextPath }: { headless: boolean, contextPath?: string } = { headless: true }): Promise<LinkedIn> {
        const browser = await firefox.launch({ headless });
        const context = await createBrowserContext(browser, browserContextPath);
        const page = await context.newPage();
        await page.goto(BASE_URL);
        return new LinkedIn(browser, page, context, browserContextPath);
    }

    /**
     * Accept cookies on the current page.
     */
    async #acceptCookies() {
        try {
            await this.#page.click(ACCEPT_COOKIES_BUTTON_SELECTOR)
        } catch {
            (() => 0)()
        }
    }

    /**
     * Login to your LinkedIn account with username and password
     * @param username The LinkedIn username to log in
     * @param password The password used to log in
     */
    public async login(username: string, password: string) {
        await this.#navigateToLoginPage();
        if (this.#isOnLoginPage) {
            await this.#acceptCookies();
            await this.#page.fill(LOGIN_USER_NAME_INPUT_SELECTOR, username);
            await this.#page.fill(LOGIN_PASSWORD_INPUT_SELECTOR, password);
            await this.#page.click(LOGIN_SUBMIT_BUTTON_SELECTOR);
            console.info('Waiting to navigation to the feed page');
            await this.#page.waitForURL(FEED_URL, {timeout: 600000});
            console.info('Currently on the feed page');
            if (this.#browserContextPath) {
                console.info('Saving the browser context');
                // Save the browser there's a given browser context path
                await this.#context.storageState({ path: this.#browserContextPath })
                console.info('Browser context saved');
            }
        }
        /* 
            If after explicitly navigated to the login page, the current url is still not the 
            login page URL, the user should autmatically logged in using browser context
        */
    }

    /**
     * Navigates to the login page
     */
    async #navigateToLoginPage() {
        await this.#page.goto(LOGIN_URL);
        await this.#page.waitForLoadState('networkidle');
    }

    /**
     * Check if the current page URL is the login page's URL
     */
    get #isOnLoginPage(): boolean {
        return this.#page.url().startsWith(LOGIN_URL)
    }

    /**
     * Returns true if the current user is logged in, false if not.
     * To check if the user is logged in, we'll go to the base url
     * and verify if the navigated url is the feed page or not.
     */
    async isUserLoggedIn(): Promise<boolean> {
        // Store the current URL to use after the execution
        const currentUrl = this.#page.url();
        await this.#page.goto(BASE_URL);
        let userLoggedIn = false;
        if (this.#page.url().startsWith(FEED_URL)) {
            userLoggedIn = true;
        }
        // Go back to the current URL to avoid side efffects
        await this.#page.goto(currentUrl);
        return userLoggedIn;
    }  

    /**
     * Close page, browser context and the browser
     */
    async close() {
        await this.#page.close();
        await this.#context.close();
        await this.#browser.close();
    }

}


/**
 * Creates a browser context either by loading the existing browser context from the given path, or by creating a new one
 * @param browser The browser instance to create the context from
 * @param path The path of the context file
 * @returns The created browser context either by loading an existing context from the provided path or by creating a new one
 */
async function createBrowserContext(browser: Browser, path: string | undefined): Promise<BrowserContext> {
    return browser.newContext((path && fs.existsSync(path)) ? { storageState: path } : {});
}