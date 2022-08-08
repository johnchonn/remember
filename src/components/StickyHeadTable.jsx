// import * as React from 'react';
// import { useState } from "react";
// import store from "../state/store";
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// const columns = [
//   { id: 'name', label: 'Repository', minWidth: 170 },
//   { id: 'stars', label: 'Stars', minWidth: 100 },
//   {
//     id: 'forks',
//     label: 'Forks',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'updated',
//     label: 'Updated',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   }
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = useState(0);
//   const [search, setSearch] = useState("");
//   const [bookmarks, view] = store(state => [state.bookmarks, state.view]);
//   const [rowsPerPage, setRowsPerPage] = useState(15);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 400 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bookmarks
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .filter(bookmark => bookmark.workspace === view)
//               .filter(bookmark => bookmark.name.toLowerCase().includes(search.toLowerCase()))
//               .map((bookmark, i) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={i}>
//                     {columns.map((column) => {
//                       const value = bookmark[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 100]}
//         component="div"
//         count={bookmarks.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
