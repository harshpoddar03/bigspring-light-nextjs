import { Grid, Box, Button, LinearProgress, Paper } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import Sidebar from '../../src/layouts/full/sidebar/Sidebar';
import Header from '../../src/layouts/full/header/Header';
import { useRef ,useState} from 'react';
import ExcelIcon from '@mui/icons-material/InsertDriveFile'; // you can replace this with a more appropriate Excel icon
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';


  export default function MyFiles() {
    const files = [
      { name: "Portfolio1.xlsx", type: "Excel" },
      { name: "Portfolio2.xlsx", type: "Excel" },
      // Add more file data here
    ];


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Header />
        <Paper elevation={3} style={{padding: '24px', borderRadius: '8px', border: "2px white"}}>
          <Box fontSize="h1.fontSize" mb={4}>
            My Files
          </Box>
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <ExcelIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name} secondary={file.type} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};
