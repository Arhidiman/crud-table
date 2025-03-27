import React from "react";
import { TableCell, TableRow, Button, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/main";
import { setEditedRecordAction, editRecordAction, setTableItemsAction, setEditedRecordId } from "@/pages/TablePage/store/tablePageReducer";
import { useFetchTableItems } from "@/Hooks/useFetchTableItems";
import { getDateFromISO } from "@/utils";
import type { ITableItemDto } from "@/ApiClient/dto";


interface IControlTableRow extends ITableItemDto {
    onDelete: (id: string) => Promise<void>
}

// documentStatus: string;
// employeeNumber: string;
// documentType: string;
// documentName: string;
// companySignatureName: string;
// employeeSignatureName: string;
// employeeSigDate: string;
// companySigDate: string;
const requiredFields = ['documentType', 'documentName']
const dateKeys = ['employeeSigDate', 'companySigDate']


export const DataTableRow: React.FC<IControlTableRow> = ({onDelete, ...rowData}) => {


    const dispatch = useAppDispatch()

    const tablePageState = useAppSelector(state => state.tablePage)

    const { editedRecord, editedRecordId } = tablePageState


    const switchEditable = (id: string) => {
        dispatch(setEditedRecordId({ id }))
    }

    const editRecord = (id: string) => {
        switchEditable(id)
    }

    const saveRecord = (id: string) => {
      switchEditable(id)
    }

    const setEditableRecord = (record: ITableItemDto) => {
        console.log(record, 'record')
        dispatch(setEditedRecordAction({editedRecord: record}))
    }

    const renderCells = (rowData: ITableItemDto) => {
        const cells = (Object.keys(rowData) as (keyof ITableItemDto)[]).map((key, i) => {

            if (requiredFields.some(field => field === key)) {
                return rowData.id === editedRecordId
                  ? <TableCell key={i}><TextField size="small" value={rowData[key]}>{rowData[key]}</TextField></TableCell>
                  : <TableCell key={i}>{rowData[key]}</TableCell>
            }

            // if (key = )

            return <TableCell key={i}>
                      {

                          dateKeys.some(field => field === key) ? getDateFromISO(rowData[key]) : rowData[key]
                      } 
                    </TableCell>
        })
        return cells
    }


    const editButton = (
        <Button variant="contained" color="primary" onClick={() => editRecord(rowData.id)}>
            Редактировать
        </Button>
    )

    const saveButton = (
      <Button variant="contained" color="primary" onClick={() => saveRecord('')}>
          Сохранить
      </Button>
    )


    console.log(rowData.id, editedRecordId, 'ids')

    
    return (  
        <TableRow>
            {renderCells(rowData)}
            <TableCell> 
                {
                    rowData.id !== editedRecordId ? editButton : saveButton
                }
            </TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => onDelete(rowData.id)}>
                      Удалить
              </Button>
            </TableCell>
        </TableRow>
    )
}

