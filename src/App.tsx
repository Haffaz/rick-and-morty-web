import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyApolloProvider from "./graphql/MyApolloProvider.tsx";
import Home from "./pages";
import ResultPage from "./pages/results";

export default function App() {
  return (
    <MyApolloProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </Router>
    </MyApolloProvider>
  );
}
