import { Page } from "playwright-core";
import { BASE_URL, PROFILE_BASE_URL } from "./url-factory";
import { USER_PROFILE_FULL_NAME_SELECTOR, USER_PROFILE_LOCATION_SELECTOR, USER_PROFILE_SHORT_DESCRIPTION_SELECTOR } from "./selectors";

export class UserProfile {
    readonly #id: string;
    readonly #page: Page;
    readonly #url: string;
    #fullName: string | undefined;
    #headline: string | undefined;
    #location: string|undefined;
    constructor(id: string, page: Page) {
        this.#id = id;
        this.#page = page;
        this.#url = `${PROFILE_BASE_URL}${id}`
    }

    /**
     * Get the full name of the user
     */
    get fullName(): Promise<string | null> {
        return this.#execute(async () => {
            if (this.#fullName) {
                return Promise.resolve(this.#fullName);
            }
            const fullName = await this.#page.textContent(USER_PROFILE_FULL_NAME_SELECTOR);
            this.#fullName = fullName ?? undefined;
            return fullName;
        });
    }

    /**
     * Get the the text under the user's full name
     */
    get headline(): Promise<string|undefined> {
        return this.#execute(async () => {
            if (this.#headline) {
                return Promise.resolve(this.#headline);
            }
            const headline = await this.#page.textContent(USER_PROFILE_SHORT_DESCRIPTION_SELECTOR);
            this.#headline = headline ?? undefined;
            return headline?.trim();
        });
    }

    /**
     * Get the location info of the current user profile
     */
    get location(): Promise<string|undefined> {
        return this.#execute(async () => {
            if (this.#location) {
                return Promise.resolve(this.#location);
            }
            const location = await this.#page.textContent(USER_PROFILE_LOCATION_SELECTOR);
            this.#location = location ?? undefined;
            return location?.trim();
        });
    }

    

    // TODO: Get user topics talk about
    // TODO: Get user mebedded link
    // TODO: Get is user premium
    // TODO: Get is user influencer
    // TODO: Get number of followers
    // TODO: Follow
    // TODO: Connect

    /**
     * Executes and returns value with the given function after navigating to the user profile page
     * @param f The function to execute after navigating to the profile page
     * @returns The returned value from the function
     */
    async #execute<T>(f: () => Promise<T>): Promise<T> {
        return this.#gotoProfilePage().then(() => f());
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