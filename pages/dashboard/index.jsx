import { Grid, Box } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import SalesOverview from '../../src/components/dashboard/SalesOverview';
import YearlyBreakup from '../../src/components/dashboard/YearlyBreakup';
import RecentTransactions from '../../src/components/dashboard/RecentTransactions';
import ProductPerformance from '../../src/components/dashboard/ProductPerformance';
import MonthlyEarnings from '../../src/components/dashboard/MonthlyEarnings';
import Sidebar from '../../src/layouts/full/sidebar/Sidebar';
import Header from '../../src/layouts/full/header/Header';

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {/* Adding Sidebar and Header directly */}
      {/* <Sidebar /> */}
      <Header />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
