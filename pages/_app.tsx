import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // Create QueryClient only once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
        activeChain={{
          chainId: 8408,
          rpc: ["https://zenchain-testnet.api.onfinality.io/public"],
          nativeCurrency: {
            name: "ZEN",
            symbol: "ZEN",
            decimals: 18
          },
          name: "Zenchain Testnet",
          shortName: "zen-testnet",
          slug: "zenchain-testnet",
        }}
      >
        <ChakraProvider value={defaultSystem}>
          <NavBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
