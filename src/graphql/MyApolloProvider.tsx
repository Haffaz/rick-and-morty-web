import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import type { ReactNode } from "react";

const httpLink = createHttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function MyApolloProvider({
  children,
}: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
