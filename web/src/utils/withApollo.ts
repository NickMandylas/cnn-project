import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://192.168.114.127:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);
