import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import dynamic from "next/dynamic";
import { useTheme } from '@emotion/react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
    const [month, setMonth] = React.useState('1');
    const [chartData, setChartData] = useState({ dates: [], prices: [] });

    const theme = useTheme();
    const primary = theme.palette.primary.main;

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/historicaldata');
            if (response.ok) {
                const data = await response.json();
                setChartData(data);
            }
        }
        fetchData();
    }, []);

    const options = {
        series: [{
            name: 'RELIANCE',
            data: chartData.prices
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
            categories: chartData.dates
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
        <DashboardCard title="Sales Overview" action={
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
        }>
            <Chart
                options={options}
                series={[{ name: 'RELIANCE', data: chartData.prices }]}
                type="area"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
