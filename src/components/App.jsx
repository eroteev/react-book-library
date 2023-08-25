import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { sepolia } from 'wagmi/chains';

import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

import { INFURA_API_KEY } from '../utils/constants';
import { Main } from './layout/Main';
import { BookDetailsContext } from "../contexts/BookDetailsContext";

export const App = () => {
  const { publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [infuraProvider({ apiKey: INFURA_API_KEY })],
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });

  const [bookDetails, setBookDetails] = useState([]);

  return (
    <BrowserRouter>
      <WagmiConfig config={config}>
        <BookDetailsContext.Provider value={{bookDetails, setBookDetails}}>
          <div className="wrapper">
            <Header/>
            <Main/>
            <Footer/>
          </div>
        </BookDetailsContext.Provider>
      </WagmiConfig>
    </BrowserRouter>
  );
}

export default App;
