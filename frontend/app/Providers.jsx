'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sepolia } from 'wagmi/chains';

// ✅ Create a query client for React Query
const queryClient = new QueryClient();

// ✅ Use `getDefaultConfig` for simplified setup
const wagmiConfig = getDefaultConfig({
  appName: 'Quickcred NFT Minting',
  projectId: "7e0a4e13739938f55ea1f1d9faddca21",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export function Providers({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
