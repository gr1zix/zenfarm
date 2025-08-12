import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { defineChain } from "thirdweb";

function MyApp({ Component, pageProps }: AppProps) {
  // Create QueryClient only once
  const [queryClient] = useState(() => new QueryClient());

  const zenChain = defineChain({
    id: 8408,
    chainId: 8408,
    rpc: "https://zenchain-testnet.api.onfinality.io/public",
    nativeCurrency: {
      name: "ZEN",
      symbol: "ZEN",
      decimals: 18
    },
    chain: "ZenChain Testnet",
    name: "ZenChain Testnet",
    shortName: "zen-testnet",
    slug: "zenchain-testnet",
    testnet: true
  })

  return (
    <ThirdwebProvider
      activeChain={zenChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>
          <NavBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
