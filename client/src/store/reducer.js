import { combineReducers } from 'redux-immutable'
import { reducer as appReducer } from './appReducer'

const reducer = combineReducers({
    app: appReducer
})

export default reducer