import { SET_RECORD_DATA } from './actions'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UnknownAction } from "redux"
import type { ITableItemDto } from "@/ApiClient/dto"
import type { ISetRecordAction } from './types'

interface ITablePageState {
    recordItem: Omit<ITableItemDto, 'id'>
}

const initialState: ITablePageState = {
    recordItem: {
        documentStatus: "",
        employeeNumber: "",
        documentType: "",
        documentName: "",
        companySignatureName: "",
        employeeSignatureName: "",
        employeeSigDate: "",
        companySigDate: ""
    }
}

export const tablePageReducer = (state: ITablePageState = initialState, action: PayloadAction<ISetRecordAction>) => {
    switch (action.type) {
        case SET_RECORD_DATA:
            return {
                ...state, [action.payload.key]: action.payload.value
            }
        default:
            return state
    }
}

export const setRecordAction = (payload: ISetRecordAction) => ({ type: SET_RECORD_DATA, payload })