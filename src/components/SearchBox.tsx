import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { fetchRepos, addRecentSearch } from '../features/search/searchSlice';

/**
 * SearchBox component allows users to input a search query to find GitHub repositories.
 * Displays recent searches and allows users to select them to prefill the search box.
 */
const SearchBox: React.FC = () => {
    // State to manage the current search query
    const [query, setQuery] = useState('');
    // Redux dispatch function typed with AppDispatch
    const dispatch = useDispatch<AppDispatch>();
    // Selector to get recent searches from the Redux store
    const recentSearches = useSelector((state: RootState) => state.search.recentSearches);

    /**
     * Handles the form submission to search for repositories.
     * Dispatches actions to fetch repositories and add the current query to recent searches.
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) {
            dispatch(fetchRepos(query));
            dispatch(addRecentSearch(query));
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search GitHub repositories..."
                />
            </form>
            {/* Display recent searches if the query is empty and there are recent searches */}
            {query === '' && recentSearches.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 rounded mt-1">
                    {recentSearches.map((search, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => setQuery(search)}
                        >
                            {search}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBox;
