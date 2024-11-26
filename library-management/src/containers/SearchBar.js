import { Button, Grid2 } from "@mui/material"

import { TextField } from "../components/TextField"

export const SearchBar = ({searchFieds , handleSearch }) => {
    const {authorSearch, genreSearch ,setAuthorSearch , setGenreSearch  } = searchFieds;
   return <Grid2 container spacing={2}>
    <Grid2 item xs={6}>
      <TextField placeholder="Search by Author" value={authorSearch} setValue={setAuthorSearch}  />
    </Grid2>
    <Grid2 item xs={6}>
    <TextField placeholder="Search by Genre" value={genreSearch} setValue={setGenreSearch}  />
    </Grid2>
    <Grid2 item xs={12}>
      <Button variant="contained" color="primary" fullWidth onClick={handleSearch}
        sx={{
          height: '30px',
          textTransform: 'capitalize'
        }}
      >
        Search
      </Button>
    </Grid2>
  </Grid2>
}