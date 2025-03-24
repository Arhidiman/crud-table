import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material"
import { useFetchTableItems } from "@/Hooks/useFetchTableItems"
import { DataTableRow } from "@/components";
import { deleteTableItem } from "@/ApiClient/ApiClient";
import type { ITableItemDto } from "@/ApiClient/dto";

const columns = [
    'ID документа', 
    'Статус', 
    'Номер сотрудника', 
    'Тип', 
    'Название', 
    'Подпись компании', 
    'Подпись сотрудника', 
    'Подписан сотрудником', 
    'Подписан компаниией',
    'Действие'
]

export const DataTable: React.FC = () => {
  
    const { items, refetch } = useFetchTableItems()

    console.log(items)

    const tableHeaderCells = () => {
        return columns.map((colName, i) => <TableCell key={i}>{colName}</TableCell>)
    }
    
    const onDelete = async (id: string) => {
        await deleteTableItem(id)
        refetch()
    }

    return (
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      {tableHeaderCells()}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {items.map((rowDdata) => (<DataTableRow key={rowDdata.id}{...rowDdata} onDelete={onDelete}/>))}
              </TableBody>
          </Table>
      </TableContainer>
    )
}

