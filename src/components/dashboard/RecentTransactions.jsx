import React, { useState, useEffect } from 'react';
import DashboardCard from '../shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { Link } from '@mui/material';

const fetchNewsFeed = async () => {
  const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo';
  const response = await fetch(url, {
    headers: {'User-Agent': 'request'}
  });

  if (response.status !== 200) {
    throw new Error(`HTTP status ${response.status}`);
  }

  const data = await response.json();
  // Adjust this based on the actual API response structure
  return data && data.feed ? data.feed : [];
};

const RecentTransactions = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetchNewsFeed()
      .then(newsData => {
        setFeed(newsData.slice(0, 5)); // Take only the top 5 news items
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <DashboardCard title="Recent News">
      <Timeline className="theme-timeline">
        {feed.map((newsItem, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              {index < feed.length - 1 && <TimelineConnector />} {/* This condition removes the last connector */}
            </TimelineSeparator>
            <TimelineContent>
              <Link href={newsItem.url} underline="none">
                {newsItem.title}
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
