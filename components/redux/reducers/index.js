import { combineReducers } from 'redux'
import { user } from './user'
import { users } from './users'

const Reducers = combineReducers({
    user: user,
    users: users
})

export default Reducers