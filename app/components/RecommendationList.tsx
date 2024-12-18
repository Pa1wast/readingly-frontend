import RecommendedBookCard from './RecommendedBookCard';

export default async function RecommendationList({ books, title, noDataText }) {
  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      <h2 className="text-xl text-primary-900 font-semibold">{title}</h2>
      <div className="flex gap-6 overflow-x-auto">
        {books && books.length ? (
          books.map(book => <RecommendedBookCard book={book} key={book.id} />)
        ) : (
          <p className="col-start-1 col-end-5 text-center mt-10 text-secondary-900">{noDataText}</p>
        )}
      </div>
    </div>
  );
}
