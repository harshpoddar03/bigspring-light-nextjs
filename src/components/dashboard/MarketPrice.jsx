import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import dynamic from "next/dynamic";
import { useTheme } from '@emotion/react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = (props) => {
    const [month, setMonth] = React.useState('1');
    // const [chartData, setChartData] = useState({ dates: [], prices: [] });
    const [percentageChange, setPercentageChange] = useState(0);
    const [latestprice, setLatestPrice] = useState(0);
    const [name,setName] = useState('RELIANCE');
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/historicaldata');
    //         if (response.ok) {
    //             const data = await response.json();
    //             setChartData(data);
    //             setName(data.stock)
    //             const latestPrice = chartData.prices[chartData.prices.length - 1];
    //             setLatestPrice(latestPrice);
    //             const previousPrice = chartData.prices[chartData.prices.length - 2];
    //             const percentageChange = ((latestPrice - previousPrice) / previousPrice) * 100;
    //             setPercentageChange(percentageChange);
    //         }
    //     }
    //     fetchData();
    // }, []);

    const options = {
        series: [{
            name: 'RELIANCE',
            data: props.chartData.prices
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
                series={[{ name: 'RELIANCE', data: props.chartData.prices }]}
                type="area"
                height="370px"
                
            />
        </DashboardCard>
        </div>
    );
};

export default SalesOverview;
