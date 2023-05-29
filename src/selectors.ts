/* eslint-disable max-len */

export const LOGIN_USER_NAME_INPUT_SELECTOR = '//*[@id="username"]'
export const LOGIN_PASSWORD_INPUT_SELECTOR = '//*[@id="password"]'
export const LOGIN_SUBMIT_BUTTON_SELECTOR = '//button[contains(@type,"submit")]'
export const COOKIE_CONSTENT_BANNER_SELECTOR = '//div[contains(@type,"COOKIE_CONSENT")]'
export const ACCEPT_COOKIES_BUTTON_SELECTOR = `${COOKIE_CONSTENT_BANNER_SELECTOR}//button[contains(@action-type, "ACCEPT")]`
export const USER_PROFILE_FULL_NAME_SELECTOR = "//div[contains(@class,'pv-text-details__left-panel')][1]/div[1]/h1";
export const USER_PROFILE_SHORT_DESCRIPTION_SELECTOR = "//div[contains(@class,'pv-text-details__left-panel')][1]/div[2]";
export const USER_PROFILE_LOCATION_SELECTOR = "//div[contains(@class,'pv-text-details__left-panel')][2]/span[1]"