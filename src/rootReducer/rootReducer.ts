import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@/components'

export const rootReducer = combineReducers({
    auth: authReducer
})
