import { getBooks } from '../lib/actions';
import BookCard from './BookCard';
import Caraousel from './Caraousel';

export default async function Test() {
  const books = await getBooks();
  return (
    <Caraousel>
      {books ? (
        books.map((book, i) => <BookCard book={book} key={i + Math.random()} />)
      ) : (
        <p>Failed to fetch books. Please try again later.</p>
      )}
    </Caraousel>
  );
}
