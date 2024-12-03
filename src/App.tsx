import React, { memo } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import useCharacterSearch from './hooks/useCharacterSearch';
import CharacterList from './components/CharacterList/CharacterList';
import { RotatingLines } from 'react-loader-spinner';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { data, loading, error } = useCharacterSearch(searchTerm);

  const handleSearch = React.useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Characters</h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </header>

      {loading &&
        <div className="loading-indicator">
          <p>Loading characters...</p>
          <RotatingLines
            visible={true}
            width="80"
            ariaLabel="loader animation"
          />
        </div>}

      {error && <div className="error-message">Error: {searchTerm} {error}</div>}

      {data && <CharacterList characters={data.results.slice(0, 10)} />}
    </div>
  );
};

export default memo(App);