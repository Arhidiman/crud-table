import React, { useState, useEffect } from "react";
import { Loader } from "@/ui/Loader/Loader";
import { Notification } from "@/components";
import { useAppDispatch, useAppSelector } from "@/main";
import { TableHead, Table, TableCell, TableContainer, TableRow, TextField, Button, Paper, FormControl, FormHelperText } from "@mui/material";
import { setRecordAction, setTableItemsAction } from "@/pages";
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
    const record = useAppSelector((state) => state.tablePage.recordItem);
    const setRecord = (key: string, value: string) => {
        dispatch(setRecordAction({ key, value }))
    };

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)


    const notificationState = useAppSelector(state => state.notification)
    const { open, severity, message } = notificationState


    const validate = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(recordFieldsMap).forEach((key) => {
            if (!record[key as keyof Omit<ITableItemDto, 'id'>]) {
                newErrors[key] = "Это поле обязательно для заполнения"
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const setNotificationState = (open: boolean, severity?: 'success' | 'error', message?: string) => {
        dispatch(setOpenNotification({ open }))
        severity && dispatch(setNotificationSeverity({ severity }))
        message && dispatch(setNotificationMessage({ message }))
    }
  
    const onCloseNotification = () => {
        dispatch(setOpenNotification({ open }))
    }

    const handleSave = async () => {
        setIsFormSubmitted(true)
        if (!validate()) return
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

        console.log(items, 'ITEMS')

        items && dispatch(setTableItemsAction({ items }))
    }, [items])


    const formRow = () => {
        return Object.keys(recordFieldsMap).map(key => {
            return (
                <TableCell>
                    <FormControl fullWidth error={isFormSubmitted && Boolean(errors[key])} variant="outlined" size="small">
                        <TextField
                            required
                            onChange={(e) => setRecord(key, e.target.value)}
                        />
                        {isFormSubmitted && errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
                    </FormControl>
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
                    <TableRow>
                        {formRow()}
                        <TableCell> 
                            <Button variant="contained" color="primary" onClick={handleSave} style={buttonStyle}>
                                {creating ? <Loader/> : 'Создать запись'}
                            </Button>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}
