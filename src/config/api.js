const apiKey = import.meta.env.VITE_API_KEY;

export const coinList = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&sparkline=false&key=${apiKey}`;
};

export const singleCoin = (id) => {
    return `https://api.coingecko.com/api/v3/coins/${id}?key=${apiKey}`;
};

export const historicalChart = (id, days = 365, currency) => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&key=${apiKey}`;
};

export const trendingCoins = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&key=${apiKey}`;
};