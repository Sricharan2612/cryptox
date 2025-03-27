import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {
    const bannerStyles = {
        backgroundImage: "url(./banner2.jpg)",
    };
    const bannerContent = {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
        justifyContent: 'space-around'

    };
    const title = {
        display: 'flex',
        flexDirection: 'column',
        height: '40%',
        justifyContent: 'Center',
        textAlign: 'center'
    };
    return (
        <div style={bannerStyles} >
            <Container sx={bannerContent} disableGutters>
                <div style={title}>
                    <Typography variant='h2' sx={{ fontWeight: 'bold', marginBottom: '15px', fontFamily: 'Montserrat' }}>
                        CryptoX
                    </Typography>
                    <Typography variant='subtitle2' sx={{ color: 'darkgrey', textTransform: 'captalize', fontFamily: 'Montserrat' }}>
                        Get all the info reagrding your favorite crypto currency
                    </Typography>
                </div>
                <Carousel />
            </Container>

        </div>
    );
};

export default Banner;
