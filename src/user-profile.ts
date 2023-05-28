import { Page } from "playwright-core";
import { BASE_URL, PROFILE_BASE_URL } from "./url-factory";
import { USER_PROFILE_FULL_NAME_SELECTOR } from "./selectors";

export class UserProfile {
    readonly #id: string;
    readonly #page: Page;
    readonly #url: string;
    #fullName: string | undefined;

    constructor(id: string, page: Page) {
        this.#id = id;
        this.#page = page;
        this.#url = `${PROFILE_BASE_URL}${id}`
    }

    /**
     * Get the full name of the user
     */
    get fullName(): Promise<string | null> {
        return this.#gotoProfilePage().then(async () => {
            if (this.#fullName) {
                return Promise.resolve(this.#fullName);
            }
            const fullName = await this.#page.textContent(USER_PROFILE_FULL_NAME_SELECTOR);
            this.#fullName = fullName ?? undefined;
            return fullName;
        });
    }

    /**
     * Navigates to the user profile page if necessary
     */
    async #gotoProfilePage() {
        if (this.#page.url().startsWith(this.#url)) {
            // If the current url is the profile page url, do nothing
            return;
        }
        // Otherwise navigate to the profile page
        await this.#page.goto(this.#url);
    }
}