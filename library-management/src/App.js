import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Snackbar,
} from '@mui/material';

import { SearchBar } from './containers/SearchBar';

const App = () => {
  const [books, setBooks] = useState([]);
  const [authorSearch, setAuthorSearch] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/books?author=${authorSearch}&genre=${genreSearch}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setSnackbarMessage('Failed to fetch books');
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, [page, rowsPerPage]);

  const obj = {
    authorSearch: authorSearch,
    genreSearch: genreSearch, 
    setAuthorSearch: setAuthorSearch, 
    setGenreSearch: setGenreSearch
  }

  return (
    <Container>
      <Typography variant="h5" sx={{fontWeight:"bold", marginTop:"12px"}} gutterBottom>Book List</Typography>

      {/* Search Bar */}
      <Grid2 sx={{display:"flex", justifyContent:"end"}} >
      <SearchBar searchFieds={obj} handleSearch={handleSearch} />
      </Grid2>

      {/* Loading Spinner */}
      {loading ? (
        <Grid2 className="loader">
          <CircularProgress style={{ marginTop: '20px' }} />
        </Grid2>
      ) : 
      !books?.length > 0 ? <Typography sx={{textAlign:"center" , marginTop:"20px"}} >No Data found</Typography> : (
        <>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Author</strong></TableCell>
                  <TableCell><strong>Genre</strong></TableCell>
                  <TableCell><strong>ISBN</strong></TableCell>
                  <TableCell><strong>Year</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
