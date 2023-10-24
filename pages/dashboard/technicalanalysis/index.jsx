import { Grid, Box ,styled } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import TechAnalysis from '../../../src/components/dashboard/TechnicalAnalysis';
import SentimentAnalysis from '../../../src/components/dashboard/SentimentAnalysis';
import RecentTransactions from '../../../src/components/dashboard/NewsStock';
import ProductPerformance from '../../../src/components/dashboard/TopPerformance';
import MonthlyEarnings from '../../../src/components/dashboard/GrowthStock';
import StockSearchBar from '../../../src/components/dashboard/StockSearchBar';
import Sidebar from '../../../src/layouts/full/sidebar/Sidebar';
import Header from '../../../src/layouts/full/header/Header';
import { useState,useEffect, useRef } from 'react';

const FlexContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch' // Ensures children stretch to the same height.
});

const StyledRecentTransactions = styled(RecentTransactions)({
  flex: 1,  // Takes up equal space in the flex container.
  overflowY: 'auto'  // Scrollbar will appear if content exceeds container's height.
});

const StyledProductPerformance = styled(ProductPerformance)({
  flex: 1,  // Takes up equal space in the flex container.
  overflowY: 'auto'  // Scrollbar will appear if content exceeds container's height.
});

const NoPaddingGrid = styled(Grid)({
  paddingLeft: 0, // Remove left padding
});

export default function Home() {

  const handleSearchResults = (results) => {
    // Do something with the results.
    console.log(results);
  };

  const [chartData, setChartData] = useState({ dates: [], prices: [] });
  const [name,setName] = useState(null);
  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/historicaldata');
        if (response.ok) {
            const data = await response.json();
            // setChartData(data);
            setChartData(data);
            setName(data.stock);
        }
    }
    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Header />
      <Box>
        <NoPaddingGrid container spacing={3}>

          {/* Left Side: Sidebar */}
          <Grid item xs={12} md={3}>
            <Sidebar />
          </Grid>

          {/* Right Side: Main Content */}
          <NoPaddingGrid item xs={12} md={9}>
            
            {/* Search Bar */}
            <Box mb={3}>
              <StockSearchBar onResults={handleSearchResults} />
            </Box>

            {/* Sales Overview */}
            <Grid container>
              <Grid item xs={12}>
                {/* <SalesOverview />
                 */}
                 <TechAnalysis chartData={chartData} name={name} />

              </Grid>
            </Grid>

            {/* Recent Transactions & Product Performance */}

            
            {/* Yearly Breakup & Monthly Earnings */}
            {/* <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SentimentAnalysis />
              </Grid>
              <Grid item xs={12} md={6}>
                <MonthlyEarnings />
              </Grid>
            </Grid> */}
{/* 
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledRecentTransactions />
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledProductPerformance />
              </Grid>
            </Grid> */}

          </NoPaddingGrid>
        </NoPaddingGrid>
      </Box>
    </PageContainer>
  );
}
