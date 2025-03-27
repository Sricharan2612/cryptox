import React, { Children, createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();
const CryptoContextApi = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');

  useEffect(() => {
    if (currency === 'INR') {
      setSymbol('₹');
    } else if (currency === 'USD') {
      setSymbol('$');
    }
  });
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContextApi;

export const CryptoState = () => {
  return useContext(Crypto);
};
