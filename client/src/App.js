import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";
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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
