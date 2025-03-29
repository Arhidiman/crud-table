import React, { useEffect } from "react";
import { ProgressBar } from "../../ui/ProgressBar/ProgressBar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/main";
import { setTableItemsAction } from "@/pages";
import { DataTableRow, Notification } from "@/components";
import { setOpenNotification, setNotificationMessage, setNotificationSeverity } from "@/components/Notification/store/notificationReducer";
import { deleteTableItem, getTableItems } from "@/ApiClient/ApiClient"
import { useFetchTableItems } from "@/Hooks/useFetchTableItems";
import type { ITableItemDto } from "../../ApiClient/dto";

const columns = [
    'ID документа', 
    'Статус', 
    '№ сотрудника', 
    'Тип', 
    'Название', 
    'Подпись компании', 
    'Подпись сотрудника', 
    'Подписан сотрудником', 
    'Подписан компаниией',
    '',
    ''
]

export const DataTable: React.FC = () => {
  
    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.tablePage.tableItems)

    const { loading, error } = useFetchTableItems()

    const notificationState = useAppSelector(state => state.notification)
    const { open, severity, message } = notificationState

    const setNotificationState = (open: boolean, severity?: 'success' | 'error', message?: string) => {
        dispatch(setOpenNotification({ open }))
        severity && dispatch(setNotificationSeverity({ severity }))
        message && dispatch(setNotificationMessage({ message }))
    } 
  
    useEffect(() => {
        if (error) {
            setNotificationState(true, 'error', error)
        }
    }, [items])

    useEffect(() => {
        if (!items) {
            setNotificationState(true, 'error', 'Отсутствуют данные таблицы')
        } 
    }, [items])

    const onCloseNotification = () => {
        dispatch(setOpenNotification({ open: false }))
    }

    const tableHeaderCells = () => {
        return columns.map((colName, i) => <TableCell key={i} style={{width: '250px'}}>{colName}</TableCell>)
    }
    
    const onDelete = async (id: string) => {
        await deleteTableItem(id)
        // setLoading(true)
        const tableItems = await getTableItems()
        // setLoading(true)
        tableItems && dispatch(setTableItemsAction({items: tableItems}))
    }
    

    return (
      <>
        <Notification open={open} severity={severity} message={message} handleClose={onCloseNotification}/>
          {
              loading ? <ProgressBar/>
              : <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaderCells()}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items && items.map((rowDdata: ITableItemDto) => (<DataTableRow key={rowDdata.id}{...rowDdata} onDelete={onDelete}/>))}
                        </TableBody>
                    </Table>
                </TableContainer>
          }
      </>
    )
}

