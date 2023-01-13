import "./App.css";
import Header from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import Project from "./components/Project";

//To supress warning, conflict between incoming and existing change
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: cache,
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Header />
        <Project />
        <Clients />
      </ApolloProvider>
    </div>
  );
}

export default App;
