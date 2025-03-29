import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@/components'
import { tablePageReducer } from '@/pages'
import { notificationReducer } from '@/components/Notification/store/notificationReducer'

console.log(tablePageReducer, 't p r')

export const rootReducer = combineReducers({
    auth: authReducer,
    tablePage: tablePageReducer,
    notification: notificationReducer
})
