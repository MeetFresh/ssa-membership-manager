import * as constants from './constants'

export const setLogin = (isLogin) => ({
    type: constants.SET_LOGIN,
    isLogin
})

export const setCurrPage = (pageName) => ({
    type: constants.SET_CURR_PAGE,
    pageName
})

export const setProfile = (profile) => ({
    type: constants.SET_PROFILE,
    profile
})