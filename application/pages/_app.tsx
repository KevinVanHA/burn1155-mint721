import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain="polygon"
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;