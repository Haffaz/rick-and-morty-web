import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchComponent from './components/SearchComponent';
import ResultPage from './pages/results';
import MyApolloProvider from "./graphql/MyApolloProvider.tsx";

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
