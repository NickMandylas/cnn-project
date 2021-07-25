import type { AppProps } from "next/app";
import { Provider as BumbagProvider } from "bumbag";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BumbagProvider isSSR>
      <Component {...pageProps} />
    </BumbagProvider>
  );
}
export default MyApp;
