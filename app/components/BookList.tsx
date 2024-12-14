import { getBooks, searchBooks } from '../lib/actions';
import BookCard from './BookCard';

export default async function BookList({ searchParams }) {
  let books = [];

  if (searchParams?.searchTerm) books = await searchBooks(searchParams.searchTerm);
  else books = await getBooks();

  return (
    <div className="grid grid-cols-2 pt-24 px-4 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-6 justify-items-center">
      {books.length ? (
        books.map(book => <BookCard book={book} key={book.id} />)
      ) : searchParams.searchTerm ? (
        <p className="col-start-1 col-end-5 text-center mt-10 text-secondary-900">
          Nothing matched your search!
        </p>
      ) : (
        <p className="col-start-1 col-end-5 text-center mt-10 text-secondary-900">
          Failed to fetch books. Please try again later.
        </p>
      )}
    </div>
  );
}
