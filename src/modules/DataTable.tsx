import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";

const rows = [
  { id: 1, name: "Документ 1", status: "Готово" },
  { id: 2, name: "Документ 2", status: "В процессе" },
  { id: 3, name: "Документ 3", status: "Ожидание" },
];

export const DataTable: React.FC = () => {
  const handleClick = (id: any) => {
    console.log("Нажата кнопка для строки с id:", id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleClick(row.id)}>
                  Нажать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

