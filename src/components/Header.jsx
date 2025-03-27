import { AppBar, Container, createTheme, FormControl, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContextApi';

const Header = () => {
    const navigate = useNavigate();
    //context API
    const { currency, setCurrency, symbol } = CryptoState();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            mode: 'dark',
        },

    });
    console.log(currency);

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography variant='h5' onClick={() => navigate('/')} style={{ flex: 1, color: 'gold', fontFamily: 'Montserrat', fontWeight: 'bold', cursor: 'pointer' }}>CryptoX</Typography>
                        <Select value={currency} onChange={(e) => setCurrency(e.target.value)} variant='outlined' style={{ width: 100, height: 40, marginRight: 15 }}>
                            <MenuItem selected value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider>
    );
};

export default Header;
