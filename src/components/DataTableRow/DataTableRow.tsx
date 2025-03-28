import React, { ChangeEvent, useState } from "react";
import { TableCell, TableRow, Button, TextField } from "@mui/material"
import { Loader } from "@/ui/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/main";
import { editRecordAction, setEditedRecordId } from "@/pages/TablePage/store/tablePageReducer";
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
    const { editedRecordId } = tablePageState


    const [saving, setIsSaving] = useState<boolean>(false)
    const [deleting, setIsDeleting] = useState<boolean>(false)

    const switchEditable = (id: string) => {
        dispatch(setEditedRecordId({ id }))
    }

    const editRecord = (id: string) => {
        switchEditable(id)
    }

    const saveRecord = async (id: string) => {
        const editedRecord = tablePageState.tableItems.find((item: ITableItemDto) => item.id === id)
        setIsSaving(true)
        await updateTableItem(id, editedRecord)
        setIsSaving(false)
        switchEditable('')
    }

    const deleteRecord = async (id: string) => {
        setIsDeleting(true)
        await onDelete(id)
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
                  ? <TableCell key={i}>
                        <TextField 
                            size="small" 
                            value={rowData[key]} 
                            onChange={(e) => editTableItemsList(e, rowData.id, key)}
                        >
                            {rowData[key]}
                        </TextField>
                    </TableCell>
                  : <TableCell key={i}>{rowData[key]}</TableCell>
            }
            return <TableCell key={i}>
                      {

                          dateKeys.some(field => field === key) ? getDateFromISO(rowData[key]) : rowData[key]
                      } 
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
          { saving ? <Loader/> : 'Сохранить'}
      </Button>
    )

    
    return (  
        <TableRow style={{height: '100px'}}>
            {renderCells(rowData)}
            <TableCell> 
                {
                    rowData.id !== editedRecordId ? editButton : saveButton
                }
            </TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => deleteRecord(rowData.id)} style={buttonStyle}>
                  { deleting ? <Loader/> : 'Удалить'}
              </Button>
            </TableCell>
        </TableRow>
    )
}

