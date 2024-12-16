import { Suspense } from 'react';
import { ChevronDown, Loader, XSquareIcon } from 'lucide-react';
import UserBooksList from '@/app/components/UserBooksList';
import FilterBooks from '../components/FilterBooks';
import UserGenreList from '../components/UserGenreList';
import { Dropdown, DropdownContent, DropdownTrigger } from '../components/Dropdown';
import SelectGenre from '../components/SelectGenre';
import { getGenres } from '../lib/actions';
import SearchGenre from '../components/SearchGenre';

export const metadata = { title: 'Readingly - My Books' };

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const genreSearchTerm = params.genreSearchTerm;

  const genres = await getGenres();

  let searchedGenres;

  if (genreSearchTerm)
    searchedGenres = genres?.filter(genre => genre.name.includes(genreSearchTerm));

  const displayedGenres = searchedGenres ?? genres;

  return (
    <div className="md:px-6 py-8  px-4 sm:px-6 space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl  uppercase text-primary-900 font-semibold">My Books</h1>

          {/* <Suspense
            fallback={
              <Loader className="rotate absolute  right-[50%] mt-40 size-12 text-primary-300  translate-x-[-50%] translate-y-[-50%]" />
            }
          >
            <UserGenreList />
          </Suspense> */}

          <Dropdown>
            <DropdownTrigger className="bg-secondary-500 flex gap-2 items-center rounded-md px-4 py-1 font-semibold text-neutral-900 hover:bg-secondary-400">
              Favourite Genres
            </DropdownTrigger>

            <DropdownContent>
              <div className="bg-primary-50 px-4 py-6 rounded-md fixed min-w-80 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 flex flex-col gap-4">
                <DropdownTrigger className="flex gap-2 items-center rounded-md p-1 font-semibold text-primary-900 hover:text-primary-600 absolute top-0 right-0">
                  <XSquareIcon />
                </DropdownTrigger>

                <h1 className="text-secondary-900">
                  Select your favourite genres and get better recommendations!
                </h1>

                <SearchGenre />

                <div className="flex flex-wrap gap-4 max-h-[400px] overflow-y-auto">
                  <Suspense
                    fallback={
                      <Loader className="rotate absolute  right-[50%] mt-40 size-12 text-primary-300  translate-x-[-50%] translate-y-[-50%]" />
                    }
                  >
                    {searchedGenres && searchedGenres.length === 0 ? (
                      <p>No genre found!</p>
                    ) : (
                      displayedGenres?.map(genre => (
                        <SelectGenre value={genre.name} title={genre.name} key={genre.id} />
                      ))
                    )}
                  </Suspense>
                </div>
              </div>
            </DropdownContent>
          </Dropdown>
        </div>

        <FilterBooks activeFilter={searchParams?.filter} />
      </div>

      <Suspense
        fallback={
          <Loader className="rotate absolute  right-[50%] mt-40 size-12 text-primary-300  translate-x-[-50%] translate-y-[-50%]" />
        }
      >
        <UserBooksList filter={params?.filter} />
      </Suspense>
    </div>
  );
}
