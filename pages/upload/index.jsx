import { Grid, Box, Button, LinearProgress, Paper } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import Sidebar from '../../src/layouts/full/sidebar/Sidebar';
import Header from '../../src/layouts/full/header/Header';
import { useRef ,useState} from 'react';
import ExcelIcon from '@mui/icons-material/InsertDriveFile'; // you can replace this with a more appropriate Excel icon


export default function Home() {
  // Reference to the hidden input element
  const hiddenFileInput = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handler for the Upload button click
  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };


  // Handler for file input change
  const handleFileChange = event => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    
    // Simulate file upload
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return Math.min(prevProgress + 10, 100); 
      });
    }, 500);
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Header />
          {/* Center the content vertically */}
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginRight={10} height="calc(100vh - 10px)">
            {/* Bordered Box with increased height */}
            <Paper elevation={3} style={{ 
              padding: '24px',
              borderRadius: '8px',
              border: "2px white",
              height: '50%',
              alignItems: 'center', 
              display: 'flex',
              flexDirection: 'column',
            //   justifyContent: 'center' ,
              width: '70%'
            }}>
              <Box fontSize="h1.fontSize" mb={4} >
                Upload your Portfolio file
              </Box>
              <Box fontSize="p.fontSize" mb={4} >
                Add your porfolio file to get started. You can either go to your files or click on the button below to upload a new file.
              </Box>

              {uploading && (
                <Box my={3} width="100%">
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              )}
              <Box display="flex" flexDirection="row" gap={3}>
                {/* Hidden file input */}
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileChange}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: 'none' }}
                    />
                <Button variant="outlined">My File</Button>
                <Button 
                variant="contained" 
                color="primary" 
                startIcon={<img src="/images/logos/excel.svg" alt="Excel Icon" width={24} height={24} />}
                style={{ backgroundColor: '#217346', color: 'white' }} // Excel green color and white text
                onClick={handleUploadClick}
>
                  Upload
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
