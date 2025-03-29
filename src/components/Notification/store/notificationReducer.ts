import { SET_OPEN, SET_SEVERITY, SET_MESSAGE } from "./actions"
import type { AnyAction } from "redux"


type TSeverity = 'success' | 'error'

interface INotificationState {
    open: boolean,
    severity: TSeverity,
    message: string
}

const initialState = {
    open: false,
    severity: 'success' as TSeverity,
    message: ''
}

export const notificationReducer = (state: INotificationState = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_OPEN:
            return {
                ...state, open: action.payload.open
            }
        case SET_SEVERITY:
            return {
                ...state, severity: action.payload.severity
            }
        case SET_MESSAGE:
            return {
                ...state, message: action.payload.message
            }
        default:
            return state
    }
}


export const setOpenNotification = (payload: { open: boolean }) => ({ type: SET_OPEN, payload })
export const setNotificationSeverity = (payload: {severity: TSeverity}) => ({ type: SET_SEVERITY, payload })
export const setNotificationMessage = (payload: {message: string}) => ({ type: SET_MESSAGE, payload })
