// StockSearchBar.jsx
import React, { useState } from 'react';
import { TextField, Box, List, ListItem, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const StockSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value) {
      fetchResults(event.target.value);
    } else {
      setResults([]);
    }
  };

  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: searchQuery,
          apikey: 'CFSA27NGK92IIT1K' // replace with your API key
        }
      });
      setResults(response.data.bestMatches || []);
      console.log("search results called");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <Box mb={2} position="relative">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for stocks..."
        value={query}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      {results.length > 0 && (
        <Paper elevation={2} style={{ position: 'absolute', top: '100%', width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
          <List>
            {results.map((result, index) => (
              <ListItem key={index}>
                {result['1. symbol']} - {result['2. name']}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default StockSearchBar;
