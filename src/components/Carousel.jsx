import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { trendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContextApi';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const Carousel = () => {
    //Context API
    const { currency, symbol } = CryptoState();
    //States
    const [trending, setTrending] = useState([]);
    const carousel = {
        height: '50%',
        display: 'flex',
        alignItems: 'center'
    };

    const carouselItems = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        TextTransform: 'uppercase',
        color: 'white'
    };

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(trendingCoins(currency));
        setTrending(data);
    };
    //useEffect
    useEffect(() => {
        fetchTrendingCoins();

    }, [currency]);

    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    };

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link style={carouselItems} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height='80' style={{ marginBottom: '10px' }} />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span style={{ color: profit > 0 ? 'rgb(14,203,129)' : 'red', fontWeight: 500 }}>
                        {profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: '22px', fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 5,
        },
    };

    return (
        <div style={carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    );
};

export default Carousel;
