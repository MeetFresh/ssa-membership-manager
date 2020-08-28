import * as constants from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    loggedIn: false,
    currPage: null
})

export const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case constants.SET_LOGIN:
            return state.set('loggedIn', action.isLogin)
        case constants.SET_CURR_PAGE:
            return state.set('currPage', action.pageName)
        default:
            return state
    }
}