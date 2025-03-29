import { SET_RECORD_DATA, SET_TABLE_ITEMS, SET_EDITED_RECORD, EDIT_RECORD, SET_EDITED_RECORD_ID } from './actions'
import type { AnyAction } from '@reduxjs/toolkit'
import type { ITableItemDto } from "@/ApiClient/dto"
import type { ISetRecordAction } from './types'

interface ITablePageState {
    recordItem: Omit<ITableItemDto, 'id'>,
    tableItems: ITableItemDto[] | [],
    editedRecord: ITableItemDto | {},
    editedRecordId: string
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
        companySigDate: "",
    },
    tableItems: [],
    editedRecord: {},
    editedRecordId: ''
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
        case SET_EDITED_RECORD:
            return {
                ...state, editedRecord: action.payload.editedRecord
            }
        case EDIT_RECORD:
            return {
                ...state, tableItems: state.tableItems.map((item: ITableItemDto) => {
                    if (action.payload.id === item.id) {
                        return {
                            ...item, [action.payload.key]: action.payload.value
                        }
                    } else {
                        return item
                    }
                })
            }
        case SET_EDITED_RECORD_ID:
            return {
                ...state, editedRecordId: action.payload.id
            }
        default:
            return state
    }
}

export const setRecordAction = (payload: ISetRecordAction) => ({ type: SET_RECORD_DATA, payload })
export const setTableItemsAction = (payload: {items: ITableItemDto[] | undefined}) => ({ type: SET_TABLE_ITEMS, payload })
export const setEditedRecordAction = (payload: {editedRecord: ITableItemDto}) => ({ type: SET_EDITED_RECORD, payload })
export const editRecordAction = (payload: {id: string, key: string, value: string}) => ({ type: EDIT_RECORD, payload })
export const setEditedRecordId = (payload: {id: string}) => ({ type: SET_EDITED_RECORD_ID, payload })