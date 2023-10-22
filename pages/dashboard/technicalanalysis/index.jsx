import { Grid, Box } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import SalesOverview from '../../../src/components/dashboard/MarketPrice';
import YearlyBreakup from '../../../src/components/dashboard/SentimentAnalysis';
import RecentTransactions from '../../../src/components/dashboard/NewsStock';
import ProductPerformance from '../../../src/components/dashboard/TopPerformance';
import MonthlyEarnings from '../../../src/components/dashboard/GrowthStock';
import Sidebar from '../../../src/layouts/full/sidebar/Sidebar';
import Header from '../../../src/layouts/full/header/Header';

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {/* Adding Sidebar and Header directly */}
      <Sidebar />
      <Header />
      <Box>
        <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
            <Box mt={6} ml={10}>
              <SalesOverview />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Box mt={6} ml={5}>
                <YearlyBreakup />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid> */}
          {/* <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
}
