import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import RepoCard from './RepoCard';

/**
 * RepoList component displays a list of GitHub repositories.
 * Allows users to select a repository to view more details.
 */
const RepoList: React.FC = () => {
    // Selector to get repositories, loading, and error states from the Redux store
    const { repositories, loading, error } = useSelector((state: RootState) => state.search);
    // State to manage the ID of the selected repository
    const [selectedRepo, setSelectedRepo] = useState<number | null>(null);

    // Find the selected repository object based on the selectedRepo ID
    const selectedRepository = repositories.find((repo) => repo.id === selectedRepo);

    return (
        <div>
            {/* Display a loading message if data is being fetched */}
            {loading && <p>Loading...</p>}
            {/* Display an error message if there was an error fetching data */}
            {error && <p className="text-red-500">{error}</p>}
            {/* Render a scrollable list of repositories */}
            <ul className="overflow-y-scroll h-80">
                {repositories.slice(0, 8).map((repo) => (
                    <li
                        key={repo.id}
                        className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                        onClick={() => setSelectedRepo(repo.id)}
                    >
                        {repo.name}
                    </li>
                ))}
            </ul>
            {/* Render the RepoCard component if a repository is selected */}
            {selectedRepository && (
                <RepoCard repo={selectedRepository} />
            )}
        </div>
    );
};

export default RepoList;
