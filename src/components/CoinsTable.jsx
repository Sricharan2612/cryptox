import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContextApi';
import { coinList } from '../config/api';
import axios from 'axios';
import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
    const navigate = useNavigate();
    //Context API
    const { currency, symbol } = CryptoState();
    //States
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    //Handlers
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(coinList(currency));
        setCoins(data);
        setLoading(false);
    };

    const handleSearch = () => {
        return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
    };

    //useEffect
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#14161a'
            },
            mode: 'dark'
        }
    });

    //Function to add commas to price
    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h4'
                    style={{ margin: '18px', fontFamily: 'Montserrat' }}
                >
                    Crypto Currency Prices by Market Cap
                </Typography>
                <TextField
                    label='Search for crypto currency'
                    variant='outlined'
                    style={{ marginBottom: '20px', width: '100%' }}
                    onChange={(e) => { setSearch(e.target.value); }}
                />

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: 'gold' }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: '#EEBC1D', color: '#000' }}>
                                    <TableRow>
                                        {
                                            ['Coin', 'Price', '24h Change', 'Market Cap'].map((heading) => (
                                                <TableCell
                                                    sx={{ color: '#000', fontWeight: 700, fontFamily: 'Montserrat' }}
                                                    key={heading}
                                                    align={heading === 'Coin' ? '' : 'right'}
                                                >
                                                    {heading}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch().map((coin) => {
                                            const profit = coin.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    key={coin.id}
                                                    onClick={() => navigate(`/coins/${coin.id}`)}
                                                    sx={{
                                                        backgroundColor: '#16171a',
                                                        cursor: 'pointer',
                                                        fontFamily: 'Montserrat',
                                                        '&:hover': {
                                                            backgroundColor: '#131111',
                                                        },
                                                    }}
                                                >
                                                    <TableCell
                                                        component='th'
                                                        scope='row'
                                                        style={{ display: 'flex', gap: 15 }}
                                                    >
                                                        <img
                                                            src={coin?.image}
                                                            alt={coin.name}
                                                            height='50'
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ textTransform: 'uppercase', fontSize: '22px' }}>
                                                                {coin.symbol}
                                                            </span>
                                                            <span style={{ color: 'darkgrey' }}>{coin.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align='right'
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        {symbol}{' '} {numberWithCommas(coin.current_price)}
                                                    </TableCell>
                                                    <TableCell
                                                        align='right'
                                                        style={{
                                                            color: profit > 0 ? 'rgb(14,203,129)' : 'red', fontWeight: 500
                                                        }}>
                                                        {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell
                                                        align='right'
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider >
    );
};

export default CoinsTable;
