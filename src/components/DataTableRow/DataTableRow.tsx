import React from "react";
import { TableCell, TableRow, Button } from "@mui/material"
import type { ITableItemDto } from "@/ApiClient/dto";

interface IControlTableRow extends ITableItemDto {
    onDelete: (id: string) => Promise<void>
}

export const DataTableRow: React.FC<IControlTableRow> = ({onDelete, ...rowData}) => {

    const renderCells = (rowData: ITableItemDto) => {
        const cells = (Object.keys(rowData) as (keyof ITableItemDto)[]).map((key, i) => {
            return <TableCell key={i}>{rowData[key]}</TableCell>
        })
        return cells
    }

    return (  
        <TableRow>
            {renderCells(rowData)}
            <TableCell> 
                <Button variant="contained" color="primary" onClick={() => onDelete(rowData.id)}>
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    )
}

