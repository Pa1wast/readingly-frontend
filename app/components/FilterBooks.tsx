'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

function FilterBooks({ activeFilter }) {
  const router = useRouter();

  function setFilter(filter) {
    if (!filter.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.delete('filter');
      router.push(url.pathname + url.search);
      return;
    }

    router.push(`/mybooks/?filter=${filter}`);
  }

  return (
    <div className="flex p-2 gap-2 text-xs sm:text-sm font-semibold border border-secondary-500 rounded-md">
      <button
        onClick={() => setFilter('all')}
        className={twMerge(
          'px-2 py-1 bg-secondary-100 rounded-md',
          (activeFilter === 'all' || !activeFilter) && 'bg-secondary-500'
        )}
      >
        All
      </button>
      <button
        onClick={() => setFilter('currently-reading')}
        className={twMerge(
          'px-2 py-1 bg-secondary-100 rounded-md',
          activeFilter === 'currently-reading' && 'bg-secondary-500'
        )}
      >
        Currently Reading
      </button>
      <button
        onClick={() => setFilter('want-read')}
        className={twMerge(
          'px-2 py-1 bg-secondary-100 rounded-md',
          activeFilter === 'want-read' && 'bg-secondary-500'
        )}
      >
        Want to Read
      </button>
      <button
        onClick={() => setFilter('read')}
        className={twMerge(
          'px-2 py-1 bg-secondary-100 rounded-md',
          activeFilter === 'read' && 'bg-secondary-500'
        )}
      >
        Read
      </button>
    </div>
  );
}

export default FilterBooks;
