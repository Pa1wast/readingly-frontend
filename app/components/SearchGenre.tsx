'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For client-side navigation

function SearchGenre() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  function search() {
    if (!searchTerm.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.delete('genreSearchTerm');
      router.push(url.pathname + url.search);
      return;
    }

    router.push(`/mybooks/?genreSearchTerm=${searchTerm}`);
  }

  return (
    <div className="items-center flex gap-[2px] w-full sm:w-[350px] p-4 md:w-[400px] rounded-md">
      <input
        onChange={e => {
          if (e.target.value === '') {
            const url = new URL(window.location.href);
            url.searchParams.delete('genreSearchTerm');
            router.push(url.pathname + url.search);
          }

          setSearchTerm(e.target.value);
        }}
        onKeyDown={e => e.key === 'Enter' && search()}
        value={searchTerm}
        name="genre-search-term"
        className="placeholder:text-secondary-600 bg-primary-50 w-full border-primary-800 border-2 px-3 py-2 rounded-md"
        placeholder="Search genres..."
      />
      <button
        onClick={search}
        className="px-3 py-2 rounded-md text-secondary-100 bg-primary-600 border-primary-800 border-2 hover:bg-primary-300 hover:border-primary-300"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchGenre;
