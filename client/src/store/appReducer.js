import * as constants from './constants'
import { fromJS } from 'immutable'
import { checkoutItemList } from '../Payment/checkoutItemList'
import { userList } from '../dashboard/userList'

const defaultState = fromJS({
    loggedIn: false,
    currPage: null,
    profile: {
        first: '',
        last: '',
        pronoun: '',
        status: ''
    },
    shoppingCart: [],
    isAdmin: false,
    checkoutItemList: checkoutItemList,
    userList: userList
})

export const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case constants.SET_LOGIN:
            return state.set('loggedIn', fromJS(action.isLogin))
        case constants.SET_CURR_PAGE:
            return state.set('currPage', fromJS(action.pageName))
        case constants.SET_PROFILE:
            return state.set('profile', fromJS(action.profile))
        case constants.CLEAR_CART:
            return state.set('shoppingCart', fromJS([]))
        case constants.ADD_TO_CART:
            return state.set('shoppingCart', fromJS(
                [...state.get('shoppingCart').toJS(), ...checkoutItemList.filter((item) => (item.id === action.itemId)) ]));
        case constants.SET_ADMIN:
            return state.set('isAdmin', fromJS(action.isLogin))
        default:
            return state
    }
}