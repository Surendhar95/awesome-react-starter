import { SET_TOKEN, REMOVE_TOKEN } from '../constants'

export const setToken = (token) => {
    return ({ type: SET_TOKEN, payload: token })
}

export const removeToken = () => {
    return ({ type: REMOVE_TOKEN })
}
