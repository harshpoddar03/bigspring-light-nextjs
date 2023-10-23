import React, { useState, useEffect } from 'react';
import { IconArrowUpRight, IconCurrencyDollar } from '@tabler/icons-react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Avatar
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const ProductPerformance = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo')
            .then(response => response.json())
            .then(result => {
                // Take only the top 5 results from the array
                const topFiveGainers = result.top_gainers.slice(0, 5);
                setData(topFiveGainers);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data.</p>;
    }

    return (
        <div style={{ marginBottom: '0px', marginRight: "7.5%" }}>
            <DashboardCard title="Top Performers">
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Stocks
                                    </Typography>
                                </TableCell>
                                <TableCell style={{display: "flex",gap: "10px"}}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Growth
                                    </Typography>
                                    <Avatar sx={{ bgcolor: "green", width: 20, height: 20 }}>
                                        <IconArrowUpRight width={20} color="darkgreen" />
                                    </Avatar>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Price
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.ticker}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {item.ticker}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={item.change_percentage}
                                        ></Chip>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6">${item.price}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>
        </div>
    );
};

export default ProductPerformance;
