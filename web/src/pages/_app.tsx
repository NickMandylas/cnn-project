import type { AppProps } from "next/app";
import { Provider as BumbagProvider } from "bumbag";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <BumbagProvider isSSR>
        <Component {...pageProps} />
      </BumbagProvider>
    </ApolloProvider>
  );
}
export default MyApp;
