import React from 'react';
//Styles
import './App.css';
//React router
import { Routes, Route } from 'react-router-dom';
//Components
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
//Material UI
import { Container } from '@mui/material';


function App() {

  return (
    <Container maxWidth disableGutters sx={{ backgroundColor: '#14161a', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
    </Container >
  );
}

export default App;
