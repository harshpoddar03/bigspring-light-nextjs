import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import dynamic from "next/dynamic";
import { useTheme } from '@emotion/react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


function calculateBollingerBands(prices, N=20, K=2) {
    let sma = [];
    let upperBand = [];
    let lowerBand = [];
  
    for(let i = 0; i < prices.length; i++) {
      if (i < N) {
        sma.push(null);
        upperBand.push(null);
        lowerBand.push(null);
        continue;
      }
  
      const slice = prices.slice(i - N, i);
      const mean = slice.reduce((a, b) => a + b, 0) / N;
      const std = Math.sqrt(slice.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / N);
  
      sma.push(mean);
      upperBand.push(mean + K * std);
      lowerBand.push(mean - K * std);
    }
  
    return { sma, upperBand, lowerBand };
  }
  

const TechAnalysis = (props) => {
    const [month, setMonth] = React.useState('1');
    // const [chartData, setChartData] = useState({ dates: [], prices: [] });
    const [percentageChange, setPercentageChange] = useState(0);
    const [latestprice, setLatestPrice] = useState(0);
    const [name,setName] = useState('RELIANCE');
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const { sma, upperBand, lowerBand } = calculateBollingerBands(props.chartData.prices);

    

    const options = {
        series: [{
            name: 'RELIANCE',
            data: props.chartData.prices
        },
        {
            name: 'Upper Band',
            data: upperBand
        },
        {
            name: 'Lower Band',
            data: lowerBand
        },
        {
            name: 'SMA',
            data: sma
        }],
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(2);
                },
            },
            title: {
                text: 'Price'
            },
        },
        xaxis: {
            type: 'datetime',
            categories: props.chartData.dates
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return val.toFixed(2);
                }
            }
        }
    };

    return (

        <div style={{ marginBottom: '20px',marginRight: '50px',marginLeft: "-9%" }}>
        <DashboardCard title={props.name} action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={event => setMonth(event.target.value)}
            >
                <MenuItem value={1}>March 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem>
            </Select>
        }
        style={{ marginBottom: '10px' }}>
<Chart
    options={options}
    series={options.series}
    type="area"
    height="370px"
/>
        </DashboardCard>
        </div>
    );
};

export default TechAnalysis;
