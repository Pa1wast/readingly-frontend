import { Suspense } from 'react';
import RecommendedBookCard from '../components/RecommendedBookCard';
import {
  getBasedOnReadBooks,
  getBooks,
  getFavouriteGenresBooks,
  getHighlyRatedBooks,
} from '../lib/actions';
import { auth } from '../lib/auth';
import { Loader } from 'lucide-react';
import RecommendationList from '../components/RecommendationList';

export const metadata = { title: 'Readingly - Recommendations' };

export default async function Page() {
  const highlyRateBooks = await getHighlyRatedBooks();
  const favouriteGenresBooks = await getFavouriteGenresBooks();
  const basedOnReadBooks = await getBasedOnReadBooks();

  return (
    <div className="px-4 py-6 flex flex-col gap-16">
      <RecommendationList books={favouriteGenresBooks} title="Based on your favourite genres" />

      <RecommendationList
        books={basedOnReadBooks}
        title="Based on books you've read"
        noDataText="FInished reading some books? Add them to your Read shelf and get more recommendations"
      />

      <RecommendationList books={highlyRateBooks} title="Your most rated books" />
    </div>
  );
}
