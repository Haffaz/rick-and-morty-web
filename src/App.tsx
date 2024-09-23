import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import MyApolloProvider from "./graphql/MyApolloProvider.tsx";
import ResultPage from "./pages/results";

export default function App() {
  return (
    <MyApolloProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchComponent />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </Router>
    </MyApolloProvider>
  );
}
