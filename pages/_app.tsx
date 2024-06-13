"use client"
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { SiweMessage } from 'siwe';
import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from '@rainbow-me/rainbowkit';
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
const hostUrl = 'http://192.168.3.118:9211'

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
  const {address} = useAccount()
  const [AUTHENTICATION_STATUS, setAUTHENTICATION_STATUS] = useState<'loading' | 'unauthenticated' | 'authenticated'>('unauthenticated')
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      setAUTHENTICATION_STATUS('unauthenticated')
      const response = await fetch(`${hostUrl}/api/auth/nonce`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return data.nonce
    },

    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },

    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },

    verify: async ({ message, signature }) => {
      const verifyRes = await fetch(`${hostUrl}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.prepareMessage(), signature }),
      });
      const data = await verifyRes.json();
      if (data.success) {
        setAUTHENTICATION_STATUS('authenticated')
      } else {
        setAUTHENTICATION_STATUS("unauthenticated")
      }
      return Boolean(data.success);
    },

    signOut: async () => {
      setAUTHENTICATION_STATUS('unauthenticated')
      await fetch('/api/logout');
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitAuthenticationProvider
          adapter={authenticationAdapter}
          status={AUTHENTICATION_STATUS}
        >
          <RainbowKitProvider >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitAuthenticationProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
