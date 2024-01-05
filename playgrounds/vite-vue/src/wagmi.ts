import { http, createConfig } from 'use-wagmi'
import { celo, goerli, mainnet, optimism, sepolia } from 'use-wagmi/chains'
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from 'use-wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, celo, goerli],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
    coinbaseWallet({ appName: 'Vite React Playground', darkMode: true }),
    safe({ debug: true, shimDisconnect: true }),
    metaMask(),
    injected(),
  ],
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/StF61Ht3J9nXAojZX-b21LVt9l0qDL38',
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/roJyEHxkj7XWg1T9wmYnxvktDodQrFAS',
    ),
    [optimism.id]: http(),
    [celo.id]: http(),
    [goerli.id]: http(),
  },
})

declare module 'use-wagmi' {
  interface Register {
    config: typeof config
  }
}