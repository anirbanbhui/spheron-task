import React from 'react';
import SearchBox from './components/SearchBox';
import RepoList from './components/RepoList';

const App: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <SearchBox />
      <RepoList />
    </div>
  );
};

export default App;
