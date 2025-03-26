import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/main";
import { setTableItemsAction } from "@/pages";
import { DataTableRow } from "@/components";
import { deleteTableItem, getTableItems } from "@/ApiClient/ApiClient"
import type { ITableItemDto } from "../../ApiClient/dto";

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
  
    const dispatch = useAppDispatch()

    const items = useAppSelector(state => state.tablePage.tableItems)

    const tableHeaderCells = () => {
        return columns.map((colName, i) => <TableCell key={i}>{colName}</TableCell>)
    }
    
    const onDelete = async (id: string) => {
        await deleteTableItem(id)
        const tableItems = await getTableItems()
        tableItems && dispatch(setTableItemsAction({items: tableItems}))
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
                  {items.map((rowDdata: ITableItemDto) => (<DataTableRow key={rowDdata.id}{...rowDdata} onDelete={onDelete}/>))}
              </TableBody>
          </Table>
      </TableContainer>
    )
}

