// —————————————————————————————————————————————————————————————————————————————
// Import

import { useState } from "react"
import store from "../state/store";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


// —————————————————————————————————————————————————————————————————————————————
// Data

// const headers = [
//   {
//     col: "Repository",
//     key: "name",
//   },
//   {
//     col: "Stars",
//     key: "stars",
//   },
//   {
//     col: "Forks",
//     key: "forks",
//   },
//   {
//     col: "Updated",
//     key: "updated",
//   },
// ]

const columns = [
  { id: 'name', label: 'Repository', minWidth: 170 },
  { id: 'stars', label: 'Stars', minWidth: 100 },
  {
    id: 'forks',
    label: 'Forks',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'updated',
    label: 'Updated',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
];


// —————————————————————————————————————————————————————————————————————————————
// Component

function SearchTable() {
  const [bookmarks, view] = store(state => [state.bookmarks, state.view]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sort, setSort] = useState({
    column: "repository",
    ascending: true,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // function handleHeaderClick(column) {
  //   setSort({
  //     column,
  //     ascending: sort.column === column ? !sort.ascending : true,
  //   })
  // }

  return (
    <main id="SearchTable">
      <div className="search-container">
        <div className="search-inputs">
          <input
            className="search-input"
            placeholder=" Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>
    </div>
    <Paper className="paper" sx={{ width: '80%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table sx={ {background: "#536e7c"} } stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  sx={ {background: "#1c313a"} }
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, color: "white", fontWeight: "300" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {bookmarks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter(bookmark => bookmark.workspace === view)
              .filter(bookmark => bookmark.name.toLowerCase().includes(search.toLowerCase()))
              .map((bookmark, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = bookmark[column.id];
                      return (
                        <TableCell style={{color: "white", fontWeight: "200"}} key={column.id} align={column.align}>
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
      <TablePagination
        style={{color: "lightgrey"}}
        sx={ {background: "#1c313a"} }
        rowsPerPageOptions={[5, 10, 15, 100]}
        component="div"
        count={bookmarks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </main>
  )

//   return (
//     <main id="SearchTable">
//       <div className="search-container">
//       <div className="search-inputs">
//       <input
//         className="search-input"
//         placeholder=" Search..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <div className="search-icon">
//         <SearchIcon />
//       </div>
//       </div>
//     </div>
//       <table>
//         <thead>
//           <tr className="thead-tr" >
//             { headers.map(h => <th key={h.col}>{h.col}</th>) }
//           </tr>
//         </thead>
//         <tbody>
//           {
//             bookmarks
//               .filter(b => b.workspace === view)
//               .filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
//               .map((b, i) => (
//                 <tr className="tbody-tr" key={i}>
//                   {
//                     headers.map(h => <td key={h.key}>{b[h.key]}</td>)
//                   }
//                 </tr>
//               ))
//           }
//         </tbody>
//       </table>
//     </main>
//   )
// }

// return (
//   <main id="SearchTable">
//     <div className="search-container">
//       <div className="search-inputs">
//       <input
//         className="search-input"
//         placeholder=" Search..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       <div className="search-icon">
//         <SearchIcon />
//       </div>
//       </div>
//     </div>
//     <div className="table-container">
//       {/* <div> */}
//         <div className="table-titles" >
//           { headers.map(h => <div style={ {color: "white"} } key={h.col}>{h.col}</div>) }
//         </div>
//       {/* </div> */}
//       <div className="table-body">
//         {
//           bookmarks
//             .filter(b => b.workspace === view)
//             .filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
//             .map((b, i) => (
//               <div style={ {color: "white"} } className="input-data" key={i}>
//                 {
//                   headers.map(h => <div key={h.key}>{b[h.key]}</div>)
//                 }
//               </div>
//             ))
//         }
//       </div>
//     </div>
//   </main>
// )
}


// —————————————————————————————————————————————————————————————————————————————
// Export

export default SearchTable