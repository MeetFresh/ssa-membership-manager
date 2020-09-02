import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    loggedIn: false,
    currPage: null,
    profile: {
        first: '',
        last: '',
        pronoun: '',
        status: '',
        email: ''
    }
})

export const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case constants.SET_LOGIN:
            return state.set('loggedIn', fromJS(action.isLogin))
        case constants.SET_CURR_PAGE:
            return state.set('currPage', fromJS(action.pageName))
        case constants.SET_PROFILE:
            return state.set('profile', fromJS(action.profile))
        default:
            return state
    }
}