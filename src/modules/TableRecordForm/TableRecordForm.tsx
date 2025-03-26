import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/main";
import { Table, TableBody, TableCell, TableContainer, TableRow, TextField, Button, Paper, FormControl, FormHelperText, Typography } from "@mui/material";
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
            if (!record[key]) {
                newErrors[key] = "Это поле обязательно для заполнения";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        setIsFormSubmitted(true); // Форма была отправлена
        if (!validate()) return;

        await createTableItem(record);
    };

    const renderFormFields = () => {
        return (Object.keys(recordFieldsMap) as (keyof Omit<ITableItemDto, "id">)[]).map((key) => (
            <TableRow key={key}>
                <TableCell>
                    <Typography variant="body2" color="textPrimary">
                        {recordFieldsMap[key]} <span style={{ color: "red" }}>*</span>
                    </Typography>
                </TableCell>
                <TableCell>
                    <FormControl fullWidth error={isFormSubmitted && Boolean(errors[key])} variant="outlined" size="small">
                        <TextField
                            required
                            value={record[key]}
                            onChange={(e) => setRecord(key, e.target.value)}
                        />
                        {isFormSubmitted && errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
                    </FormControl>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 4 }}>
            <Table>
                <TableBody>
                    {renderFormFields()}
                    <TableRow>
                        <TableCell colSpan={2} align="right">
                            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
                                Сохранить
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};
