import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import dynamic from "next/dynamic";
import { useTheme } from '@emotion/react';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Forecasting = () => {
    const [month, setMonth] = useState('1');
    const [chartData, setChartData] = useState({ dates: [], actual: [], forecasted: [] });
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5000/forecast', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },

});;
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }
        fetchData();
    }, []);
    

    const options = {
        series: [
            {
                name: 'Actual',
                data: chartData.actual
            },
            {
                name: 'Forecasted',
                data: chartData.forecasted
            }
        ],
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
    console.log(chartData)
    return (
        <div style={{ marginBottom: '20px', marginRight: '50px', marginLeft: "-9%" }}>
            <DashboardCard title="Stock Data" action={
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

export default Forecasting;
