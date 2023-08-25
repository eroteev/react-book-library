import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { sepolia } from 'wagmi/chains';

import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

import { INFURA_API_KEY } from '../utils/constants';
import { Main } from './layout/Main';

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

  return (
    <BrowserRouter>
      <WagmiConfig config={config}>
        <div className="wrapper">
          <Header />
          <Main />
          <Footer />
        </div>
      </WagmiConfig>
    </BrowserRouter>
  );
}

export default App;
