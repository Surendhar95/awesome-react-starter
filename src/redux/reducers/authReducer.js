import { SET_TOKEN, REMOVE_TOKEN } from '../constants'

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_TOKEN:
            return { accessToken: action.payload, isLoggedIn: true }
        case REMOVE_TOKEN:
            return { isLoggedIn: false }
        default: 
            return { ...state }
    }
}