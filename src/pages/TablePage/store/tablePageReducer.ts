import { SET_RECORD_DATA, SET_TABLE_ITEMS } from './actions'
import type { AnyAction } from '@reduxjs/toolkit'
import type { ITableItemDto } from "@/ApiClient/dto"
import type { ISetRecordAction } from './types'

interface ITablePageState {
    recordItem: Omit<ITableItemDto, 'id'>,
    tableItems: ITableItemDto[] | []
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
    },
    tableItems: []
}

export const tablePageReducer = (state: ITablePageState = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_RECORD_DATA:
            return {
                ...state, recordItem: {...state.recordItem, [action.payload.key]: action.payload.value}
            }

        case SET_TABLE_ITEMS:
            return {
                ...state, tableItems: action.payload.items
            }
            
        default:
            return state
    }
}

export const setRecordAction = (payload: ISetRecordAction) => ({ type: SET_RECORD_DATA, payload })
export const setTableItemsAction = (payload: {items: ITableItemDto[]}) => ({ type: SET_TABLE_ITEMS, payload })