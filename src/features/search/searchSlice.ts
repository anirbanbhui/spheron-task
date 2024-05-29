import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the interface for a repository object
interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

// Define the interface for the state of the search feature
interface SearchState {
    repositories: Repo[];
    recentSearches: string[];
    loading: boolean;
    error: string | null;
}

// Define the initial state for the search feature
const initialState: SearchState = {
    repositories: [],
    recentSearches: [],
    loading: false,
    error: null,
};

/**
 * Asynchronous thunk action to fetch repositories from the GitHub API based on a search query.
 * @param {string} query - The search query to use for fetching repositories.
 * @returns {Promise<Repo[]>} - A promise that resolves to an array of repository objects.
 */
export const fetchRepos = createAsyncThunk<Repo[], string>(
    'search/fetchRepos',
    async (query) => {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
        return response.data.items;
    }
);

/**
 * Create a slice for the search feature using Redux Toolkit.
 * This slice manages the state and actions related to the search functionality.
 */
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        /**
         * Action to add a recent search query to the list of recent searches.
         * The list is limited to the most recent 3 searches.
         * @param {SearchState} state - The current state of the search feature.
         * @param {PayloadAction<string>} action - The action containing the new search query.
         */
        addRecentSearch(state, action: PayloadAction<string>) {
            state.recentSearches = [action.payload, ...state.recentSearches.slice(0, 2)];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<Repo[]>) => {
                state.loading = false;
                state.repositories = action.payload;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch repositories';
            });
    },
});

// Export the action to add a recent search so it can be dispatched from components
export const { addRecentSearch } = searchSlice.actions;

// Export the reducer to be included in the Redux store
export default searchSlice.reducer;
