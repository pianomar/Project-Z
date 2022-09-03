import { combineReducers } from 'redux'
import { user } from './user'

const Reducers = combineReducers({
    user: user
})

export default Reducers