import Image from 'next/image';
import Link from 'next/link';
import noCoverImg from '@/public/no-cover.jpg';
import BookCardActions from './BookCardActions';

async function BookCard({ book }) {
  return (
    <div className="flex flex-col justify-between gap-4">
      <Link href={`/book/${book.id}`} className="min-w-max group">
        <div className="relative w-full h-40 mb-4 max-w-[250px]">
          <Image
            src={book.coverImg ?? noCoverImg}
            alt={book.title}
            fill
            className="absolute object-fill"
          />
        </div>
        <p className="text-xs w-32 mb-1 group-hover:underline group-hover:text-primary-400">
          {book.title.length > 40 ? book.title.slice(0, 40).concat('...') : book.title}
        </p>
        <p className="text-xs w-32 text-gray-700">{book.author_name?.join(', ') || 'Unknown'}</p>
      </Link>

      <BookCardActions id={book.id} />

      <form></form>
    </div>
  );
}

export default BookCard;
