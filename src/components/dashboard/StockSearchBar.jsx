import React, { useState } from 'react';
import { TextField, Box, List, ListItem, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const StockSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    if (!event.target.value) {
      setResults([]);
    }
  };

  const handleSearchClick = async () => {
    if (query) {
      fetchResults(query);
    }
  };

  const fetchResults = async (searchQuery) => {
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: searchQuery,
          apikey: process.env.NEXT_PUBLIC_API_KEY // replace with your API key
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
      {/* Start of the new container */}
      <Box display="flex" alignItems="center">
        {/* Greeting text */}
        <span style={{ 
            fontFamily: 'Tangerine, cursive', 
            fontSize: '50px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginRight: '50%' ,
            width: '30%',
          }}>
          Welcome, Harsh
        </span>

        {/* Search bar */}
        <TextField
          variant="outlined"
          placeholder="Search for stocks..."
          value={query}
          onChange={handleSearchChange}
          style={{ width: '30%',marginRight: "4%" }}
          InputProps={{
            endAdornment: (
              <Button 
                variant="contained" 
                size="small" 
                style={{ borderRadius: '10%', padding: '5px 10px', marginLeft: '10px' }} 
                onClick={handleSearchClick}
              >
                Search
              </Button>
            ),
            style: {
              '&:focus': {
                  outline: 'none !important  ',
                  boxShadow: 'none !important'
              },
              '&:hover': {
                  outline: 'none !important',
                  boxShadow: 'none !important'
              }
          }
          }}
        />
      </Box>
      {/* End of the new container */}
      
      {results.length > 0 && (
        <Paper elevation={2} style={{ position: 'absolute', top: '100%', width: '60%', maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
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
