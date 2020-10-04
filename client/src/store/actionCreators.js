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

export const clearCart = () => ({
    type: constants.CLEAR_CART
})

export const addToCart = (itemId) => ({
    type: constants.ADD_TO_CART,
    itemId
})

export const setAdmin = (isLogin) => ({
    type: constants.SET_ADMIN,
    isLogin
})

export const editCheckoutItemList = (editedItem) => ({
    type: constants.EDIT_CHECKOUT_ITEM_LIST,
    editedItem
})

export const deleteCheckoutItemList = (deletedId) => ({
    type: constants.DELETE_CHECKOUT_ITEM_LIST,
    deletedId
})

export const addCheckoutItemList = () => ({
    type: constants.ADD_CHECKOUT_ITEM_LIST
})