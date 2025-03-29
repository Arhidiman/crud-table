import { SET_USERNAME, SET_PASSWORD } from "./actionsTypes"
import type { UnknownAction } from "redux"


const initialState = {
    username: 'user13',
    password: 'password',
}

interface IAuthState {
    username: string,
    password: string,
  
}

export const authReducer = (state: IAuthState = initialState, action: UnknownAction) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state, username: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state, password: action.payload
            }
        default:
            return state
    }
}