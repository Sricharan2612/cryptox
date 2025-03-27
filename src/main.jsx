import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
//React Router
import { BrowserRouter } from 'react-router-dom';
import CryptoContextApi from './CryptoContextApi.jsx';
import 'react-alice-carousel/lib/alice-carousel.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CryptoContextApi>
        <App />
      </CryptoContextApi>
    </BrowserRouter>
  </StrictMode>,
);
