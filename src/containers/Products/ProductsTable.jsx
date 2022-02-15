import React,{useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

const columns = [
    {id: 'serial',label:"S.No",minWidth: 100},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price(₹)', minWidth: 100,
    format: (value) => value.toLocaleString('en-US') },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function ProductsTable() {
    
    const rows = useSelector(state => state.user.products);
    


    return (
        <Paper sx={{ width: '100%',height:"678px",overflow: "scroll" }} square>
        <TableContainer  sx={{ height:"678px" }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,fontWeight: "bold" }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows              
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.price}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        
        </Paper>
    );
}
