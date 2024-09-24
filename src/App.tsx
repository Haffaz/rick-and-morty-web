import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyApolloProvider from "./graphql/MyApolloProvider.tsx";
import Home from "./pages";
import CharacterPage from "./pages/character";

export default function App() {
  return (
    <MyApolloProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/c/:id" element={<CharacterPage />} />
        </Routes>
      </Router>
    </MyApolloProvider>
  );
}
