import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center w-full shadow-sm rounded-full border border-gray-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 py-3 px-5 outline-none border-none"
        />
        <button 
          type="submit" 
          className="absolute right-0 top-0 bottom-0 h-12 bg-red-600 hover:bg-red-700 text-white px-6 transition-colors duration-300 flex items-center justify-center"
          aria-label="Search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
