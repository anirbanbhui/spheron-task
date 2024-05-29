import React from 'react';

/**
 * Props for the RepoCard component.
 */
interface RepoCardProps {
    repo: {
        name: string;
        description: string;
        html_url: string;
    };
}

/**
 * RepoCard component displays details about a GitHub repository.
 * @param {RepoCardProps} props - The properties for the RepoCard component.
 * @returns {JSX.Element} - A JSX element that renders a card with repository details.
 */
const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
    return (
        <div className="p-4 border border-gray-300 rounded mt-2">
            <h2 className="text-xl font-bold">{repo.name}</h2>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View Repository
            </a>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">Deploy</button>
        </div>
    );
};

export default RepoCard;
