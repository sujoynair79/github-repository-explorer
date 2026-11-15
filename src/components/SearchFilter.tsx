import type { ChangeEvent } from "react";

type SearchFilterProps = {
  username: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onInitiateSearch: () => void;
};

const SearchFilter = ({ username, onSearch, onInitiateSearch }: SearchFilterProps) => {
  return (
    <div>
      <label htmlFor="search-input">Search Username</label>
      <input value={username} onChange={onSearch} />
      <button onClick={onInitiateSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
