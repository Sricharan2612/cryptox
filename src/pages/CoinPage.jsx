import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { singleCoin } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContextApi';
import CoinInfo from '../components/CoinInfo';
import { Box, Container, Typography } from '@mui/material';

const CoinPage = () => {
    const { id } = useParams();
    //States
    const [coin, setCoin] = useState({});
    const { currency, symbol } = CryptoState();
    const fetchCoin = async () => {
        const { data } = await axios.get(singleCoin(id));
        setCoin(data);
    };

    //useEffect
    useEffect(() => {
        fetchCoin();
    }, [currency]);

    //Handlers
    const numberWithCommas = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    };



    return (
        <Container maxWidth disableGutters sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' }, padding: '0px 20px' }}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px', borderRight: '2px solid grey', width: { xs: '100%', md: '30%' } }}
            >
                <img
                    src={coin?.image?.large}
                    alt={coin?.name}
                    height='200'
                    style={{ marginBottom: 20 }}
                />
                <Typography
                    variant='h3'
                    sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Montserrat' }}
                >
                    {coin?.name}
                </Typography>
                <Typography
                    variant='subtitle2'
                    sx={{ width: '100%', fontFamily: 'Montserrat', padding: '25px', paddingBottom: '15px', paddingTop: 0, textAlign: 'justify' }}
                >
                    {coin?.description?.en?.split('.')[0]}.
                </Typography>
                <Box
                    sx={{ alignSelf: 'start', padding: '25px', paddingTop: '10px', width: '100%', display: { xs: 'flex', md: 'block' }, flexDirection: { xs: 'column' }, alignItems: { xs: 'center', sm: 'start' } }}
                >
                    <span style={{ display: 'flex' }}>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Montserrat' }}
                        >
                            Rank:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant='h5'
                            sx={{ fontFamily: 'Montserrat' }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Montserrat' }}
                        >
                            Current Price:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant='h5'
                            sx={{ fontFamily: 'Montserrat' }}
                        >
                            {symbol}{' '}{numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Montserrat' }}
                        >
                            Market Cap:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant='h5'
                            sx={{ fontFamily: 'Montserrat' }}
                        >
                            {symbol}{' '}{numberWithCommas(coin?.market_data?.market_cap[currency?.toLowerCase()].toString().slice(0, -6))}M
                        </Typography>
                    </span>
                </Box>
            </Box>
            <CoinInfo coin={coin} />
        </Container >
    );
};

export default CoinPage;
