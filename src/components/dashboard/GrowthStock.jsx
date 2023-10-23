import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar,IconArrowUpRight } from '@tabler/icons-react';
import DashboardCard from '../shared/DashboardCard';
import { useEffect, useState } from 'react';

const MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const [percentageChange, setPercentageChange] = useState(0);
  const [latestprice, setLatestPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/historicaldata');
        if (response.ok) {
            const data = await response.json();
            const latestPrice = data.prices[data.prices.length - 1];
            setLatestPrice(latestPrice);
            const previousPrice = data.prices[data.prices.length - 2];
            const percentageChange = ((latestPrice - previousPrice) / previousPrice) * 100;
            setPercentageChange(percentageChange);
        }
    }
    fetchData();
}, []);

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <div style={{ marginBottom: '10px',marginRight: "6.5%" }}>
    <DashboardCard
      title="Growth of AAPL Stock"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          ${latestprice.toFixed(2)}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            {/* <IconArrowDownRight width={20} color="#FA896B" />
             */}
            {/* <IconArrowDownRight width={20} color={percentageChange > 0 ? "green" : "red"} />
             */}
             {percentageChange > 0 ? <IconArrowUpRight width={20} color="green" /> : <IconArrowDownRight width={20} color="red" />}
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {percentageChange.toFixed(2)}% {percentageChange > 0 ? 'up' : 'down'}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last day
          </Typography>
        </Stack>
      </>
    </DashboardCard>
    </div>
  );
};

export default MonthlyEarnings;
