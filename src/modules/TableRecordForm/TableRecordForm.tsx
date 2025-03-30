import React, { useState, useEffect } from "react";
import { Loader } from "@/ui/Loader/Loader";
import { Notification } from "@/components";
import { useAppDispatch, useAppSelector } from "@/main";
import { TableHead, TableBody, Table, TableCell, TableContainer, TableRow, TextField, Button, Paper } from "@mui/material";
import { setRecordAction, setTableItemsAction, validateRecordFormAction } from "@/pages";
import { setOpenNotification, setNotificationMessage, setNotificationSeverity } from "@/components/Notification/store/notificationReducer";
import { createTableItem } from "@/ApiClient/ApiClient";
import { useFetchTableItems } from "@/Hooks/useFetchTableItems";
import type { ITableItemDto } from "@/ApiClient/dto";

const recordFieldsMap = {
    documentStatus: "Статус",
    employeeNumber: "Номер сотрудника",
    documentType: "Тип",
    documentName: "Название",
    companySignatureName: "Подпись компании",
    employeeSignatureName: "Подпись сотрудника",
    employeeSigDate: "Подписан сотрудником",
    companySigDate: "Подписан компанией"
};

export const TableRecordForm: React.FC = () => {

    const buttonStyle = {width: '150px', height: '45px'}

    const { items, refetch } = useFetchTableItems()
    const [creating, setIsCreating] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const record = useAppSelector((state) => state.tablePage.recordItem)
    const validity = useAppSelector((state) => state.tablePage.validation)

    const setRecord = (key: string, value: string) => {
        dispatch(setRecordAction({ key, value }))
    };

    const notificationState = useAppSelector(state => state.notification)
    const { open, severity, message } = notificationState


    const setNotificationState = (open: boolean, severity?: 'success' | 'error', message?: string) => {
        dispatch(setOpenNotification({ open }))
        severity && dispatch(setNotificationSeverity({ severity }))
        message && dispatch(setNotificationMessage({ message }))
    }
  
    const onCloseNotification = () => {
        dispatch(setOpenNotification({ open }))
    }

    const handleSave = async () => {
        const allFieldsValid = Object.keys(validity).every(key => validity[key as keyof Omit<ITableItemDto, 'id'>].valid)

        if (!allFieldsValid) return
        setIsCreating(true)

        try { 
            await createTableItem(record)
            setNotificationState(true, 'success', 'Запись добавлена !')
        } catch(err: any) {
            setNotificationState(true, 'error', err.message)
        }

        setIsCreating(false)
        refetch()
    }

    const tableHeaderCells = () => {
        return Object.values(recordFieldsMap).map((colName, i) => <TableCell key={i}>{colName}</TableCell>)
    }

    useEffect(() => {
        items && dispatch(setTableItemsAction({ items }))
    }, [items])

    useEffect(() => {
        dispatch(validateRecordFormAction())
    }, [record])


    const formRow = () => {
        return Object.keys(recordFieldsMap).map(key => {

            const error = !validity[key as keyof Omit<ITableItemDto, 'id'> ].valid
            const errorMessage = validity[key as keyof Omit<ITableItemDto, 'id'> ].errorMessage

            return (
                <TableCell key={key}>
                    <TextField
                        label={error && errorMessage}
                        error={error}
                        required
                        onChange={(e) => setRecord(key, e.target.value)}
                    />
                </TableCell>
            )
        })
    }

    return (
        <>
            <Notification open={open} message={message} severity={severity} handleClose={onCloseNotification}/>
            <TableContainer component={Paper} style={{ marginBottom: '30px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeaderCells()}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            {formRow()}
                            <TableCell> 
                                <Button variant="contained" color="primary" onClick={handleSave} style={buttonStyle}>
                                    {creating ? <Loader/> : 'Создать запись'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
