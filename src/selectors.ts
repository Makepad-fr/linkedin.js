/* eslint-disable max-len */

export const LOGIN_USER_NAME_INPUT_SELECTOR = '//*[@id="username"]'
export const LOGIN_PASSWORD_INPUT_SELECTOR = '//*[@id="password"]'
export const LOGIN_SUBMIT_BUTTON_SELECTOR = '//button[contains(@type,"submit")]'
export const COOKIE_CONSTENT_BANNER_SELECTOR = '//div[contains(@type,"COOKIE_CONSENT")]'
export const ACCEPT_COOKIES_BUTTON_SELECTOR = `${COOKIE_CONSTENT_BANNER_SELECTOR}//button[contains(@action-type, "ACCEPT")]`