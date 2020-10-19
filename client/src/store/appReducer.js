import * as constants from './constants'
import { fromJS } from 'immutable'
import { checkoutItemList } from '../Payment/checkoutItemList'
import { userList } from '../dashboard/userList'
import { Redirect } from 'react-router-dom'

const defaultState = fromJS({
    loggedIn: false,
    currPage: '',
    profile: {
        first: '',
        last: '',
        pronoun: '',
        status: '',
        username: '',
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
            return state.set('profile', fromJS({
                ...action.profile,
                ...{username: state.get('profile').toJS().username}
            }))
        case constants.CLEAR_CART:
            return state.set('shoppingCart', fromJS([]))
        case constants.ADD_TO_CART:
            let checkoutItemList0 = state.get('checkoutItemList').toJS()
            .map((item) => ({name: item.name, id: item.id, desc: item.desc, price: item.price}))
            return state.set('shoppingCart', fromJS(
                [...state.get('shoppingCart').toJS(), ...checkoutItemList0.filter((item) => (item.id === action.itemId)) ]));
        case constants.SET_ADMIN:
            return state.set('isAdmin', fromJS(action.isLogin))
        case constants.EDIT_CHECKOUT_ITEM_LIST:
            let checkoutItemList1 = state.get('checkoutItemList').toJS()
            const editedEvent = action.editedItem
            let replaceIdx = -1
            checkoutItemList1.forEach((item, idx) => {if (item.id === editedEvent.id) {replaceIdx = idx}})
            if (replaceIdx !== -1) {
                checkoutItemList1[replaceIdx] = editedEvent
            }
            return state.set('checkoutItemList', fromJS(checkoutItemList1))
        case constants.DELETE_CHECKOUT_ITEM_LIST:
            let checkoutItemList2 = state.get('checkoutItemList').toJS()
            const deletedId = action.deletedId
            checkoutItemList2 = checkoutItemList2.filter((item) => (item.id !== deletedId))
            return state.set('checkoutItemList', fromJS(checkoutItemList2))
        case constants.ADD_CHECKOUT_ITEM_LIST:
            let checkoutItemList3 = state.get('checkoutItemList').toJS()
            let maxId = 0
            checkoutItemList3.filter((item) => (item.type === 'event'))
            .forEach((item) => {parseInt(maxId = Math.max(maxId, item.id.split('-')[1]))})
            const newId = action.newId
            const newEvent = {
                id: newId,
                name: 'New Unnamed Event',
                type: 'event',
                desc: "SSA Event",
                longDesc: "",
                price: 0.00,
                picSrc: "",
                learnMoreLink: ''
            }
            checkoutItemList3.splice(0, 0, newEvent)
            return state.set('checkoutItemList', fromJS(checkoutItemList3))
        case constants.SET_USERNAME:
            let profile0 = state.get('profile').toJS()
            profile0.username = action.username
            return state.set('profile', fromJS(profile0))
        case constants.CHANGE_USER_STATUS:
            let userList0 = state.get('userList').toJS()
            for (let idx = 0; idx < userList0.length; ++idx) {
                if (userList0[idx].email === action.username) {
                    userList0[idx].status = action.newStatus
                }
            }
            return state.set('userList', fromJS(userList0))
        default:
            return state
    }
}