'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  reset?: boolean;
}

export function SearchBar({ onSearch, reset = false }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (reset) {
      setSearchText('');
    }
  }, [reset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClear = () => {
    setSearchText('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <div className="input-wrap">
          <input 
            type="text" 
            placeholder="찾으시는 내용을 입력해 주세요" 
            value={searchText}
            onChange={handleInputChange}
          />
          <button 
            type="button" 
            className="clear" 
            data-ui-click="input-clear"
            onClick={handleClear}
          >
            다시입력
          </button>
          <button type="submit" className="submit">
            검색
          </button>
        </div>
      </div>
    </form>
  );
} 