import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/main";
import { TableHead, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Button, Paper, FormControl, FormHelperText, Typography } from "@mui/material";
import { setRecordAction } from "@/pages";
import { createTableItem } from "@/ApiClient/ApiClient";
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
    const dispatch = useAppDispatch();
    const record = useAppSelector((state) => state.tablePage.recordItem);
    const setRecord = (key: string, value: string) => {
        dispatch(setRecordAction({ key, value }));
    };

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(recordFieldsMap).forEach((key) => {
            if (!record[key as keyof Omit<ITableItemDto, 'id'>]) {
                newErrors[key] = "Это поле обязательно для заполнения";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return
        setIsFormSubmitted(true)
        await createTableItem(record);
    }

    const tableHeaderCells = () => {
        return Object.values(recordFieldsMap).map((colName, i) => <TableCell key={i}>{colName}</TableCell>)
    }
    
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
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {tableHeaderCells()}
                </TableRow>
            </TableHead>
            <TableRow>
                {formRow()}
                <TableCell> 
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Создать запись
                    </Button>
                </TableCell>
            </TableRow>
        </Table>
    </TableContainer>
    )
}
