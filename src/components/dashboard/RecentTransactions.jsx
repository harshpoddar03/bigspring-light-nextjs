import React, { useState, useEffect } from 'react';
import DashboardCard from '../shared/DashboardCard';
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
        setFeed(newsData.slice(0, 8)); // Take only the top 5 news items
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  return (
    <div style={{ marginBottom: '0px',marginLeft: "-18%" }}>
    <DashboardCard title="Recent News">
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {feed.map((newsItem, index) => (
          <li key={index}>
            <Link href={newsItem.url} underline="none">
              {newsItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
    </div>
  );
};

export default RecentTransactions;
