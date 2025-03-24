import React from "react";
import { TableCell, TableRow, Button } from "@mui/material"
import type { ITableItemDto } from "@/ApiClient/dto";

export const DataTableRow: React.FC<ITableItemDto> = (rowData) => {


    const handleClick = () => {
      console.log('Удалить');
    }

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
                <Button variant="contained" color="primary" onClick={() => handleClick()}>
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    )
}

