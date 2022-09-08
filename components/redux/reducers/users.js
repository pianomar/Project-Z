import { USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from "../constants"

const initialState = {
    users: [],
    usersLoaded: 0
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case USERS_DATA_STATE_CHANGE:
            const result = state.users.map(user => user.uid).includes(action.user.uid) ? state.users : [...state.users, action.user]

            return {
                ...state,
                users: result
            }
        case USERS_POSTS_STATE_CHANGE:
            const isFollow = state.users.map(user => user.uid).includes(action.uid) && state.usersLoaded != 0 ? state.usersLoaded - 1 : state.usersLoaded + 1

            return {
                ...state,
                usersLoaded: isFollow,
                users: state.users.map(user => user.uid === action.uid ?
                    { ...user, posts: action.posts } :
                    user)
            }
        default:
            return state

    }
}