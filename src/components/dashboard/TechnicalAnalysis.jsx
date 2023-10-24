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

  function calculateRSI(prices, period = 14) {
    let gains = [];
    let losses = [];
    let avgGain = [];
    let avgLoss = [];
    let rs = [];
    let rsi = [];

    // Compute gains and losses
    for (let i = 1; i < prices.length; i++) {
        let diff = prices[i] - prices[i - 1];
        gains.push(diff > 0 ? diff : 0);
        losses.push(diff < 0 ? Math.abs(diff) : 0);
    }

    // Compute average gains and losses
    let initialAvgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    let initialAvgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
    

    avgGain.push(initialAvgGain);
    avgLoss.push(initialAvgLoss);
    rs.push(initialAvgGain / initialAvgLoss);
    rsi.push(100 - (100 / (1 + rs[0])));

    for (let i = 1; i < prices.length - 1; i++) {
        avgGain.push((avgGain[i - 1] * (period - 1) + gains[i]) / period);
        avgLoss.push((avgLoss[i - 1] * (period - 1) + losses[i]) / period);
        rs.push(avgGain[i] / avgLoss[i]);
        rsi.push(100 - (100 / (1 + rs[i])));
    }

    return rsi;
}

function calculateMACD(prices, shortTermPeriod = 12, longTermPeriod = 26, signalPeriod = 9) {
    // Calculate EMA for short term and long term periods
    const shortTermEMA = calculateEMA(prices, shortTermPeriod);
    const longTermEMA = calculateEMA(prices, longTermPeriod);

    // Calculate MACD line: (shortTerm EMA - longTerm EMA)
    const macdLine = [];
    for (let i = 0; i < prices.length; i++) {
        macdLine.push(shortTermEMA[i] - longTermEMA[i]);
    }

    // Calculate Signal line which is an EMA of the MACD line
    const signalLine = calculateEMA(macdLine, signalPeriod);

    return {
        macdLine: macdLine,
        signalLine: signalLine
    };
}

function calculateEMA(prices, period) {
    const k = 2 / (period + 1);
    let emaArray = [prices[0]]; // start from the first price

    for (let i = 1; i < prices.length; i++) {
        const ema = prices[i] * k + emaArray[i - 1] * (1 - k);
        emaArray.push(ema);
    }

    return emaArray;
}




  

const TechAnalysis = (props) => {
    const [selectedAnalysis, setSelectedAnalysis] = React.useState('1');
    // const [chartData, setChartData] = useState({ dates: [], prices: [] });
    const [percentageChange, setPercentageChange] = useState(0);
    const [latestprice, setLatestPrice] = useState(0);
    const [name,setName] = useState('RELIANCE');
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const { sma, upperBand, lowerBand } = calculateBollingerBands(props.chartData.prices);
    const rsiData = calculateRSI(props.chartData.prices);


    let interpretation = "";
    let link = "";
    let options = {
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
    if(selectedAnalysis === '1' || !selectedAnalysis){
                const latestPrice = props.chartData.prices[props.chartData.prices.length - 1];
                const latestUpperBand = upperBand[upperBand.length - 1];
                const latestLowerBand = lowerBand[lowerBand.length - 1];
                link = "https://www.investopedia.com/terms/b/bollingerbands.asp";

                if (latestPrice > latestUpperBand) {
                    interpretation = "The stock is currently trading above the upper Bollinger Band, indicating it might be overbought and due for a pullback or a period of consolidation.";
                } else if (latestPrice < latestLowerBand) {
                    interpretation = "The stock is currently trading below the lower Bollinger Band, indicating it might be oversold and potentially a good buy opportunity. However, it's recommended to look for other confirmatory signals.";
                } else {
                    interpretation = "The stock is trading within the Bollinger Bands, indicating a lack of strong trend in either direction.";
                }

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
}
else if (selectedAnalysis === '2') {
    const latestRSI = rsiData[rsiData.length - 1];
    link = "https://www.investopedia.com/terms/r/rsi.asp";
    if (latestRSI > 70) {
        interpretation = "The RSI value indicates the stock might be overbought. Consider watching for a potential price decrease or consolidation.";
    } else if (latestRSI < 30) {
        interpretation = "The RSI value indicates the stock might be oversold. This could be a potential buying opportunity.";
    } else {
        interpretation = "The RSI value is neutral, indicating the momentum is neither significantly in favor of the buyers nor sellers.";
    }
    options = {
        series: [
            {
                name: 'RSI',
                data: rsiData
            },
            // {
            //     name: '70 line',
            //     data: Array(props.chartData.dates.length).fill(70)
            // },
            // {
            //     name: '30 line',
            //     data: Array(props.chartData.dates.length).fill(30)
            // },
            {
                name: 'Market Price',
                data: props.chartData.prices
            }
        ],
        chart: {
            type: 'line',
            height: 350,
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(2);
                },
            },
            title: {
                text: 'RSI Value & Market Price'
            },
        },
        xaxis: {
            type: 'datetime',
            categories: props.chartData.dates
        },
        tooltip: {
            shared: true,
            y: {
                formatter: function (val, opts) {
                    const seriesIndex = opts.seriesIndex;
                    if (seriesIndex === 0) {
                        return val.toFixed(2) + " (RSI)";
                    } else {
                        return val.toFixed(2) + " (Price)";
                    }
                }
            }
        }
    };
}

else if (selectedAnalysis === '3') {
    const prices = props.chartData.prices; // Assuming you have closing prices in this array
    const { macdLine, signalLine } = calculateMACD(prices);
    const latestMACD = macdLine[macdLine.length - 1];
    const latestSignal = signalLine[signalLine.length - 1];
    link = "https://www.investopedia.com/terms/m/macd.asp";


    if (latestMACD > latestSignal) {
        interpretation = "The MACD line is above the Signal line, which is a bullish signal. This might indicate a potential uptrend.";
        } else if (latestMACD < latestSignal) {
        interpretation = "The MACD line is below the Signal line, which is a bearish signal. This might indicate a potential downtrend.";
        } else {
        interpretation = "The MACD and Signal lines are close to each other, indicating a lack of clear direction for the stock.";
        }
        options = {
            series: [
            {
                name: 'MACD',
                data: macdLine
            },
            {
                name: 'Signal Line',
                data: signalLine
            },
            {
                name: 'Market Price',
                data: props.chartData.prices
            }
            ],
                    chart: {
                    type: 'line',
                    height: 350,
            },
                yaxis: {
                labels: {
                formatter: function (val) {
                return val.toFixed(2);
            },
            },
                title: {
                text: 'MACD & Signal Value & Market Price'
                },
            },
                xaxis: {
                type: 'datetime',
                categories: props.chartData.dates
            },
            tooltip: {
            shared: true,
            y: {
            formatter: function (val, opts) {
            const seriesIndex = opts.seriesIndex;
            if (seriesIndex === 0) {
            return val.toFixed(2) + " (MACD)";
            } else if (seriesIndex === 1) {
            return val.toFixed(2) + " (Signal)";
            } else {
            return val.toFixed(2) + " (Price)";
            }
            }
            }
            }
            };
}



    

 

    return (

        <div style={{ marginBottom: '20px',marginRight: '50px',marginLeft: "-9%" }}>
        <DashboardCard title={props.name} action={
                    <Select
            labelId="analysis-dd"
            id="analysis-dd"
            value={selectedAnalysis}
            size="small"
            onChange={event => setSelectedAnalysis(event.target.value)}
        >
            <MenuItem value='1'>Bollinger Bands</MenuItem>
            <MenuItem value='2'>RSI</MenuItem>
            <MenuItem value='3'>MACD</MenuItem>
        </Select>
        }
        style={{ marginBottom: '10px' }}>
<Chart
    options={options}
    series={options.series}
    type="area"
    height="400px"
/>
        </DashboardCard>
        <div style={{marginTop: "60px",width :"100%",display: "flex",flexDirection: "row",gap:"70px"}}>
        <DashboardCard 
       title={
        selectedAnalysis === '3' ? "MACD Interpretation" :
        selectedAnalysis === '2' ? "RSI Interpretation" : 
        "Bollinger Bands Interpretation"
      }
      
    style={{ marginTop: '70px' }}>
    <p>{interpretation}</p>
</DashboardCard>
<DashboardCard 
    title={
        selectedAnalysis === '3' ? "Moving Average Convergence/Divergence (MACD)" :
        selectedAnalysis === '2' ? "Relative Strength Index (RSI)" : 
        "Bollinger Bands"
    }

    style={{ marginTop: '70px' }}>
    <p>Want to know more about this Indicator?&nbsp;&nbsp;&nbsp;&nbsp;Visit this link</p>
    <a href={link} style={{ textDecoration: 'underline' }}>{link}</a>
</DashboardCard>

        </div>
        </div>
    );
};

export default TechAnalysis;
