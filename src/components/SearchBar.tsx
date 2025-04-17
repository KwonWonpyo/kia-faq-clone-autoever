'use client';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <form>
      <div className="search">
        <div className="input-wrap">
          <input 
            type="text" 
            placeholder="찾으시는 내용을 입력해 주세요" 
            onChange={(e) => onSearch(e.target.value)}
          />
          <button 
            type="button" 
            className="clear" 
            data-ui-click="input-clear"
            onClick={() => onSearch("")}
          >
            다시입력
          </button>
          <button type="button" className="submit">
            검색
          </button>
        </div>
      </div>
    </form>
  );
} 