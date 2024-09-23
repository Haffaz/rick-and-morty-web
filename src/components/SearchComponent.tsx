import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useCharactersQuery} from '../graphql/useCharactersQuery';

export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const {executeSearch, loading, data} = useCharactersQuery({page: 1, filter: {name: query}});

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim() !== '') {
                executeSearch();
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query, executeSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Start typing to search..."
                className="w-full p-2 text-lg border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.results.map((result) => (
                    <Link to={`/result/${result.id}`} key={result.id}>
                        <div className="bg-gray-100 p-4 rounded-md cursor-pointer">
                            {result.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
