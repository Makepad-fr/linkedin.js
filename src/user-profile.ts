import { Page } from "playwright-core";
import { BASE_URL, PROFILE_BASE_URL } from "./url-factory";

export class UserProfile {
    readonly #id: string;
    readonly #page: Page;
    readonly #url: string;

    constructor(id: string, page: Page) {
        this.#id = id;
        this.#page = page;
        this.#url = `${PROFILE_BASE_URL}${id}`
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