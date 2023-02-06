import { Dispatch, SetStateAction, useState } from 'react';
import { ChakraProvider, StatHelpText } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { createClient, WagmiConfig } from 'wagmi';
import { configureChains } from '@wagmi/core';
import { Chain } from '@wagmi/core';
import { publicProvider } from 'wagmi/providers/public';
import { Web3Context, EnvContext } from 'context';
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  foundry,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from '@wagmi/core/chains';

import { FormDataContext, FormDataProvider } from 'context/formDataContext';


interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}


export const hyperspace :  Chain  = {
  id: 3_141,
  name: 'Hyperspace',
  network: 'Hyperspace',
  nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    chainstack : {
      http: ["https://filecoin-hyperspace.chainstacklabs.com/rpc/v1"]
    },
    default: {
      http: ["https://api.hyperspace.node.glif.io/rpc/v0"]
    }
  },

};

const { provider, webSocketProvider } = configureChains(
  [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
    hyperspace,
  ],
  [publicProvider()],
);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});



const env ="staging";

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });


const web3Data : Web3ReactState = {
  chainId: 3_141,
  account: "0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132",
  active: true,
  error: undefined,
  library: undefined,
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isCAIP, setIsCAIP] = useState(false);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiConfig client={client}>
        <EnvContext.Provider value={{ env, isCAIP }}>
          <Web3Context.Provider value={web3Data}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <FormDataProvider>
                <Component {...pageProps} />
              </FormDataProvider>
            </SessionProvider>
          </Web3Context.Provider>
        </EnvContext.Provider>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
