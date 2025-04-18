export const SearchInfo = ({ totalRecord, handleReset }: { totalRecord: number, handleReset: () => void }) => {
  return (
    <div className="search-info">
      <h2 className="heading-info">
        검색결과 총 <em>{totalRecord}</em>건
      </h2>
      <button type="button" className="init" onClick={handleReset}>
        검색초기화
      </button>
    </div>
  );
};
