
import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Avatar } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';

const SentimentAnalysis = () => {
  const theme = useTheme();
  const [weightedAvgSentiment, setWeightedAvgSentiment] = useState(0);
  const [sentimentDistribution, setSentimentDistribution] = useState({
    "Bullish": 0,
    "Bearish": 0,
    "Somewhat-Bullish": 0,
    "Somewhat-Bearish": 0,
    "Neutral": 0
  });

  useEffect(() => {
    const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=60VYA20F0D2K88RS';

    fetch(url, { headers: { 'User-Agent': 'request' } })
      .then(res => res.json())
      .then(data => {
        if (data.feed && data.feed.length > 0) {
          const topTenNews = data.feed.slice(0, 10);
          const distribution = {
            "Bullish": 0,
            "Bearish": 0,
            "Somewhat-Bullish": 0,
            "Somewhat-Bearish": 0,
            "Neutral": 0
          };
          let totalWeightedSentiment = 0;
          let totalRelevanceScore = 0;

          topTenNews.forEach(feedItem => {
            feedItem.ticker_sentiment.forEach(tickerSentiment => {
              if (tickerSentiment.ticker === "AAPL") {
                distribution[tickerSentiment.ticker_sentiment_label] += 1;
                const sentimentScore = parseFloat(aaplSentiment.ticker_sentiment_score);
                const relevanceScore = parseFloat(aaplSentiment.relevance_score);
                totalWeightedSentiment += sentimentScore * relevanceScore;
                totalRelevanceScore += relevanceScore;
              }
            });
          });
          const averageWeightedSentiment = totalWeightedSentiment / totalRelevanceScore;
          setWeightedAvgSentiment(averageWeightedSentiment);
          setSentimentDistribution(distribution);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

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
    colors: [
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.primary.main
    ],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function(value) {
          return value;
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: Object.keys(sentimentDistribution) // Adding labels for the categories
  };

  const seriescolumnchart = Object.values(sentimentDistribution);

  return (
    <div style={{ marginBottom: '0px',marginLeft: "-18%" }}>
    <DashboardCard title="AAPL Stock Sentiment Analysis (Top 10 News)">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          {/* You can display more details here if needed */}
          <Typography variant="h3" fontWeight="700">
            {weightedAvgSentiment.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1">
            Weighted Average Sentiment Score
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
    </div>
  );
};

export default SentimentAnalysis;


