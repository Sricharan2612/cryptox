import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContextApi';
import axios from 'axios';
import { historicalChart } from '../config/api';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider, Container, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';

const CoinInfo = ({ coin }) => {
    const { currency } = CryptoState();
    const { id } = useParams();
    //States
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    //Handlers
    const fetchChart = async () => {
        console.log(id, currency);
        const { data } = await axios.get(historicalChart(id, days, currency));
        setHistoricalData(DateRangePickerDay.prices);
    };

    //useEffect
    useEffect(() => {
        fetchChart();
    }, [currency, days]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#fff'
            }
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '75%' }, marginTop: { xs: '0px', md: '25px' }, padding: { xs: '20px', md: '40px' }, paddingTop: { xs: '0px', md: '40px' } }}
            >
                {
                    !historicalData ? (
                        <CircularProgress sx={{ color: 'gold' }} size={250} thickness={1} />
                    ) : (
                        <Line />
                    )
                }

            </Container>
        </ThemeProvider >
    );
};

export default CoinInfo;
