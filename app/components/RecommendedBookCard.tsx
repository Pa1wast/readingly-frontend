import Image from 'next/image';
import Link from 'next/link';
import noCoverImg from '@/public/no-cover.jpg';
import RecommendedBookCardActions from './RecommendedBookCardActions';
import { auth } from '../lib/auth';
import { twMerge } from 'tailwind-merge';

async function RecommendedBookCard({ book }) {
  const session = await auth();

  const notInterestedBooks = session?.user?.notInterestedBooks;
  const isInNotInterested = notInterestedBooks?.some(bookId => bookId === book.id);

  return (
    <div
      className={twMerge('flex flex-col justify-between gap-4', isInNotInterested && 'opacity-50')}
    >
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
        <p className="text-xs w-32 text-gray-700">
          {book.author?.replace(/\[|\]|"/gim, '') || 'Unknown'}
        </p>
      </Link>

      <RecommendedBookCardActions id={book.id} />
    </div>
  );
}

export default RecommendedBookCard;
