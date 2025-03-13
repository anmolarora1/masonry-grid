import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { SearchContainer, SearchInput } from './App.styles';

const debouncedUpdateUrlFn = debounce((query: string, navigate: any) => {
  const params = new URLSearchParams();
  if (query) {
    params.set('q', query);
  }
  navigate(`?${params.toString()}`, { replace: true });
}, 500);

interface SearchProps {
  defaultValue?: string;
}

export const Search: React.FC<SearchProps> = ({ defaultValue = '' }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(defaultValue);

  const debouncedUpdateUrl = useCallback(
    (query: string) => debouncedUpdateUrlFn(query, navigate),
    [navigate]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      debouncedUpdateUrl(value);
    },
    [debouncedUpdateUrl]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateUrlFn.cancel();
    };
  }, []);

  return (
    <SearchContainer>
      <SearchInput
        type='text'
        placeholder='Search photos...'
        value={searchQuery}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};
