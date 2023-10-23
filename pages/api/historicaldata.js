import axios from 'axios';

export default async function handler(req, res) {
    const base_url = "https://www.alphavantage.co/query";
    const params = {
        "function": "TIME_SERIES_DAILY",
        "symbol": "RELIANCE.BSE",
        "outputsize": "full",
        "apikey": process.env.NEXT_PUBLIC_API_KEY
    };

    try {
        const response = await axios.get(base_url, { params });
        
        if (response.data && response.data['Time Series (Daily)']) {
            const daily_data = response.data['Time Series (Daily)'];
            const dates = Object.keys(daily_data);
            const prices = dates.map(date => parseFloat(daily_data[date]['4. close']));
            const stock = params.symbol;
            res.status(200).json({ dates, prices,stock });
            console.log("done")
        } else {
            res.status(400).json({ error: 'Data format not as expected.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data.' });
    }
}
