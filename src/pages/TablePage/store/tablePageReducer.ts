import { 
    SET_RECORD_DATA, 
    SET_TABLE_ITEMS, 
    SET_EDITED_RECORD, 
    EDIT_RECORD, 
    SET_EDITED_RECORD_ID,
    VALIDATE_RECORD_FORM 
} from './actions'
import type { AnyAction } from '@reduxjs/toolkit'
import type { ITableItemDto } from "@/ApiClient/dto"
import type { ISetRecordAction } from './types'

type TValidation = {
    valid: boolean, 
    errorMessage: string
}

interface ITablePageState {
    recordItem: Omit<ITableItemDto, 'id'>,
    tableItems: ITableItemDto[] | [],
    editedRecord: ITableItemDto | {},
    editedRecordId: string,
    validation: {
        documentStatus: TValidation,
        employeeNumber: TValidation,
        documentType: TValidation,
        documentName: TValidation,
        companySignatureName: TValidation,
        employeeSignatureName: TValidation,
        employeeSigDate: TValidation,
        companySigDate: TValidation,
    }
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
    editedRecordId: '',
    validation: {
        documentStatus: { valid: false, errorMessage: ''},
        employeeNumber: { valid: false, errorMessage: ''},
        documentType: { valid: false, errorMessage: ''},
        documentName: { valid: false, errorMessage: ''},
        companySignatureName: { valid: false, errorMessage: ''},
        employeeSignatureName: { valid: false, errorMessage: ''},
        employeeSigDate: { valid: false, errorMessage: 'ММ.ДД.ГГГГ'},
        companySigDate: { valid: false, errorMessage: 'ММ.ДД.ГГГГ'},
    }
}

const emptyValueValidate = (value: any) => value

const dateValidate = (dateString: string) => {
    const date = new Date(dateString)
    if(Number.isNaN(date.getTime())) return false
    const dateReg = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    return dateReg.test(dateString)
}

const validationFunctions = {
    documentStatus: emptyValueValidate,
    employeeNumber: emptyValueValidate,
    documentType: emptyValueValidate,
    documentName: emptyValueValidate,
    companySignatureName: emptyValueValidate,
    employeeSignatureName: emptyValueValidate,
    employeeSigDate: dateValidate,
    companySigDate: dateValidate,
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

        case VALIDATE_RECORD_FORM:
            return {
                ...state, validation: Object.keys(state.validation).reduce((acc, key) => {
                    const typedKey = key as keyof ITablePageState['validation']
                    return {
                        ...acc, [typedKey]: {
                            ...state.validation[typedKey], 
                            valid: validationFunctions[typedKey](state.recordItem[typedKey as keyof typeof state.recordItem])
                        }
                    };
                }, {} as ITablePageState['validation'])
            };
        default:
            return state
    }
}

export const setRecordAction = (payload: ISetRecordAction) => ({ type: SET_RECORD_DATA, payload })
export const setTableItemsAction = (payload: {items: ITableItemDto[] | undefined}) => ({ type: SET_TABLE_ITEMS, payload })
export const setEditedRecordAction = (payload: {editedRecord: ITableItemDto}) => ({ type: SET_EDITED_RECORD, payload })
export const editRecordAction = (payload: {id: string, key: string, value: string}) => ({ type: EDIT_RECORD, payload })
export const setEditedRecordId = (payload: {id: string}) => ({ type: SET_EDITED_RECORD_ID, payload })
export const validateRecordFormAction = () => ({ type: VALIDATE_RECORD_FORM })