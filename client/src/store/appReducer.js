import * as constants from './constants'
import { fromJS } from 'immutable'
import { checkoutItemList } from '../Payment/checkoutItemList'

const defaultState = fromJS({
    loggedIn: false,
    currPage: null,
    profile: {
        first: '',
        last: '',
        pronoun: '',
        status: ''
    },
    shoppingCart: [
        {
            id: 'membership-student',
            name: 'Student Membership',
            desc: 'Subscription as a student for one month.',
            price: '2.51'
        }, { 
            id: 'summer-school',
            name: 'Summer School 2021',
            desc: 'Summer school taking place on June 8, 2021.',
            price: '200.00'
        },
    ]
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
                [...state.get('shoppingCart').toJS(), ...checkoutItemList.filter((item) => (item.id === action.itemId)) ]))
        default:
            return state
    }
}