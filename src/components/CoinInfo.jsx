import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContextApi';
import axios from 'axios';
import { historicalChart } from '../config/api';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider, Container, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import SelectButton from './SelectButton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinInfo = ({ coin }) => {
    const { currency } = CryptoState();
    const { id } = useParams();
    //States
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    //Handlers
    const fetchChart = async () => {

        const { data } = await axios.get(historicalChart(id, days, currency));
        setHistoricalData(data.prices);
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
                maxWidth
                disableGutters
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: { xs: '100%', md: '75%' }, marginTop: { xs: '0px', md: '25px' }, padding: { xs: '20px', md: '40px' }, paddingTop: { xs: '0px', md: '40px' } }}
            >
                {
                    !historicalData ? (
                        <CircularProgress sx={{ color: 'gold' }} size={250} thickness={1} />
                    ) : (
                        <>
                            <Line style={{ width: '100%' }}
                                data={{
                                    labels: historicalData.map((data) => {
                                        let date = new Date(data[0]);
                                        let time = date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                            : `${date.getHours()}:${date.getMinutes()}AM`;

                                        return days === 1 ? time : date.toLocaleDateString();
                                    }),
                                    datasets: [
                                        {
                                            data: historicalData.map((data) => data[1]),
                                            label: `Price (Past ${days} Days) in ${currency}`,
                                            borderColor: '#EEBC1D'
                                        }
                                    ]
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        }
                                    }
                                }}

                            />
                            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-around', width: '100%' }}>
                                {chartDays.map((day) => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>
                        </>
                    )
                }

            </Container>
        </ThemeProvider >
    );
};

export default CoinInfo;
