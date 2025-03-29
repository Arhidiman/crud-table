import React, { ChangeEvent, useState } from "react";
import { TableCell, TableRow, Button, TextField } from "@mui/material"
import { Loader } from "@/ui/Loader/Loader";
import { Notification } from "@/components/Notification/ui/Notification";
import { useAppDispatch, useAppSelector } from "@/main";
import { editRecordAction, setEditedRecordId } from "@/pages/TablePage/store/tablePageReducer";
import { setOpenNotification, setNotificationMessage, setNotificationSeverity } from "../Notification/store/notificationReducer";
import { getDateFromISO } from "@/utils";
import { updateTableItem } from "@/ApiClient/ApiClient";
import type { ITableItemDto } from "@/ApiClient/dto";

interface IControlTableRow extends ITableItemDto {
    onDelete: (id: string) => Promise<void>
}

const requiredFields = ['documentType', 'documentName']
const dateKeys = ['employeeSigDate', 'companySigDate']

export const DataTableRow: React.FC<IControlTableRow> = ({onDelete, ...rowData}) => {

    const buttonStyle = {width: '140px', height: '40px'}

    const dispatch = useAppDispatch()
    const tablePageState = useAppSelector(state => state.tablePage)
    const notificationState = useAppSelector(state => state.notification)

    const { editedRecordId } = tablePageState
    const { open, severity, message } = notificationState

    const [saving, setIsSaving] = useState<boolean>(false)
    const [deleting, setIsDeleting] = useState<boolean>(false)

    const switchEditable = (id: string) => {
        dispatch(setEditedRecordId({ id }))
    }

    const editRecord = (id: string) => {
        switchEditable(id)
    }

    const setNotificationState = (open: boolean, severity?: 'success' | 'error', message?: string) => {
        dispatch(setOpenNotification({ open }))
        severity && dispatch(setNotificationSeverity({ severity }))
        message && dispatch(setNotificationMessage({ message }))
    }

    const onCloseNotification = () => {
        setNotificationState(false)
    }

    const saveRecord = async (id: string) => {
        const editedRecord = tablePageState.tableItems.find((item: ITableItemDto) => item.id === id)
        setIsSaving(true)
        try { 
            await updateTableItem(id, editedRecord)
            setNotificationState(true, 'success', 'Запись обновлена !')
        } catch(err: any) {
            setNotificationState(true, 'error', err.message)
        }

        setIsSaving(false)
        switchEditable('')
    }

    const deleteRecord = async (id: string) => {
        setIsDeleting(true)
        try { 
            await onDelete(id)
            setNotificationState(true, 'success', 'Запись удалена !')
        } catch(err: any) {
            setNotificationState(true, 'error', err.message)
        }
        setIsDeleting(false)
    }

    const editTableItemsList = (e: ChangeEvent, id: string, key: string) => {
      const target = e.target as HTMLInputElement
      const value = target.value
      dispatch(editRecordAction({id, key, value}))
    }

    const renderCells = (rowData: ITableItemDto) => {
      const cells = (Object.keys(rowData) as (keyof ITableItemDto)[]).map((key, i) => {
          if (requiredFields.some(field => field === key)) {
              return rowData.id === editedRecordId
                  ? <TableCell key={i} style={{width: '250px', padding: '4px'}}>
                      <TextField 
                          size="small" 
                          value={rowData[key]} 
                          onChange={(e) => editTableItemsList(e, rowData.id, key)} 
                          fullWidth
                      />
                  </TableCell>
                  : <TableCell key={i} style={{width: '250px', padding: '4px'}}>{rowData[key]}</TableCell>
          }
          return <TableCell key={i} style={{width: '250px', padding: '4px'}}>
                    {dateKeys.some(field => field === key) ? getDateFromISO(rowData[key]) : rowData[key]}
                 </TableCell>
      })
      return cells
  }


    const editButton = (
        <Button variant="contained" color="primary" onClick={() => editRecord(rowData.id)} style={buttonStyle}>
            Редактировать
        </Button>
    )

    const saveButton = (
        <Button variant="contained" color="primary" onClick={() => saveRecord(rowData.id)} style={buttonStyle}>
            { saving ? <Loader/> : 'Сохранить' }
        </Button>
    )

    const deleteButton = (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={() => deleteRecord(rowData.id)} 
            style={buttonStyle}
        >
            { deleting ? <Loader/> : 'Удалить' }
        </Button>
    )
    
    return (  
      <>
        <Notification open={open} message={message} severity={severity} handleClose={onCloseNotification}/>
        <TableRow style={{height: '100px'}}>
              {renderCells(rowData)}
              <TableCell> 
                  { rowData.id !== editedRecordId ? editButton : saveButton }
              </TableCell>
              <TableCell>
                  {deleteButton}
              </TableCell>
          </TableRow>
      </>
      
    )
}

