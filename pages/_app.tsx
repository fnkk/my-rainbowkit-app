"use client"
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, http } from '@wagmi/core'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  okxWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets";
import Dymic from './dymic';
const artela = {
  id: 11822,
  name: 'Artela Testnet',
  network: 'artela-testnet',
  iconUrl: 'https://framerusercontent.com/images/xLv7JZ8nzPaZ9zk7j63YbRZHqY.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Artela',
    symbol: 'ART',
  },
  rpcUrls: {
    public: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
    default: {
      http: [
        'https://betanet-rpc1.artela.network',
        'https://betanet-rpc2.artela.network'
      ]
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
    etherscan: { name: 'SnowTrace', url: 'https://betanet-scan.artela.network/' },
  },
  testnet: false,
};
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [okxWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'Renaissance',
    projectId: '080999b35ff4ade22e595b9aeb16db24',
  }
);

// const config = createConfig({
//   connectors,
//   transports: {
//     [artela.id]: http("https://betanet-rpc1.artela.network")
//   },
//   chains: [artela]
// })
const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    artela
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        {/* <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={AUTHENTICATION_STATUS}
        >
          <RainbowKitProvider > */}
        <Dymic>
          <Component {...pageProps} />
        </Dymic>
        {/* </RainbowKitProvider>
        </RainbowKitAuthenticationProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
