import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Avatar } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';

const SentimentAnalysis = () => {
  const theme = useTheme();
  const [sentiment, setSentiment] = useState({ score: 0, label: "Neutral" });

  useEffect(() => {
    const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=CFSA27NGK92IIT1K';

    fetch(url, { headers: { 'User-Agent': 'request' } })
      .then(res => res.json())
      .then(data => {
        if (data.feed && data.feed.length > 0) {
          const aaplSentiment = data.feed[0].ticker_sentiment.find(t => t.ticker === "AAPL");
          if (aaplSentiment) {
            setSentiment({ score: aaplSentiment.ticker_sentiment_score, label: aaplSentiment.ticker_sentiment_label });
          }
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const primary = sentiment.label === "Bullish" ? theme.palette.success.main : theme.palette.error.main;

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, '#F9F9FD'],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const seriescolumnchart = [sentiment.score * 100, 100 - (sentiment.score * 100)];  // assuming sentiment score is between 0 and 1

  return (
    <DashboardCard title="AAPL Stock Sentiment Analysis">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
        <Typography variant="h3" fontWeight="700">
            {typeof sentiment.score === "number" ? sentiment.score.toFixed(2) : "0.00"}
        </Typography>


          <Typography variant="subtitle1">
            {sentiment.label}
          </Typography>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default SentimentAnalysis;
