import { getUserBooks } from '../lib/actions';
import BookCard from './BookCard';

export default async function UserBooksList({ filter }) {
  const books = await getUserBooks();

  let allBooks;

  if (filter === 'currently-reading') allBooks = [...books?.cur];
  else if (filter === 'want-read') allBooks = [...books?.wantTo];
  else if (filter === 'read') allBooks = [...books?.read];
  else if (filter === 'not-interested') allBooks = [...books?.notInterested];
  else allBooks = [...books?.cur, ...books?.wantTo, ...books?.read];

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-6 justify-items-center">
      {allBooks.length ? (
        allBooks.map(book => <BookCard book={book} key={book.id} />)
      ) : (
        <p className="text-secondary-900 col-span-6 mt-16 text-lg">No books!</p>
      )}
    </div>
  );
}
