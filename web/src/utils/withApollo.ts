import { withApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const apolloClient = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  //@ts-ignore
  link: createUploadLink({
    uri: "http://192.168.114.127:4000/graphql",
    credentials: "include",
  }),
});

export default withApollo(apolloClient);
