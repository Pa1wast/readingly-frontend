import { getBook, getUserById } from '@/app/lib/actions';
import { Params } from 'next/dist/server/request/params';
import Image from 'next/image';
import noCoverImg from '@/public/no-cover.jpg';
import BookActions from '@/app/components/BookActions';
import Rating from '@/app/components/Rating';
import { auth } from '@/app/lib/auth';

import WriteReview from '@/app/components/WriteReview';
import Link from 'next/link';

export default async function Page({ params }: { params: Params }) {
  const bookId = params.bookId;

  const book = await getBook(bookId);

  const reviews = book?.reviews;

  let reviewsWithUsers = [];

  if (reviews)
    reviewsWithUsers = await Promise.all(
      reviews.map(async review => {
        const user = await getUserById(review.userId);
        return { text: review.text, user };
      })
    );

  const ratings = book.ratings || [];
  const avgRating =
    ratings.length > 0 ? ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length : 0;

  const session = await auth();
  let user;

  if (session) user = session.user;

  const bookRating = user?.ratedBooks?.find(rating => rating.bookId.toString() === bookId);

  return (
    <div className="flex flex-col md:flex-row md:px-4 gap-12">
      <div className="md:h-full md:fixed md:w-[30vw] pt-6 space-y-8">
        <div className="space-y-6">
          <div className="relative w-[300px] md:w-full lg:w-[300px] md:h-80 h-96 mx-auto">
            <Image
              src={book.coverImg ?? noCoverImg}
              alt={book.title}
              fill
              className="absolute object-fill"
            />
          </div>
          <div className="flex justify-center">
            <BookActions id={book.id} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {bookRating ? (
            <h3 className="text-lg font-medium text-secondary-900">
              You&apos;ve rated this book{' '}
              <span className="font-bold text-secondary-700">{bookRating.rating}</span>
              /5
            </h3>
          ) : (
            <h3 className="text-lg font-medium text-secondary-900">Rate this book</h3>
          )}

          <Rating id={book.id} bookRating={bookRating?.rating} />
        </div>
      </div>

      <div className="md:ml-[35vw] w-full md:my-10 px-6">
        <h1 className="text-xl font-semibold">{book.title}</h1>

        <h2 className="text- font-semibold text-neutral-600">
          {book.author.replace(/\[|\]|"/gim, '')}
        </h2>

        <div className="flex text-neutral-600 gap-2">
          <p>Genre:</p>
          <h3 className=" ">{book.genre.replace(/\[|\]|"/gim, '')}</h3>
        </div>

        <p className="text-secondary-700 font-semibold mb-10">Avergae Rating: {avgRating}/5</p>

        <div className="border-t border-secondary-200">
          <h4 className="text-xl font-semibold text-secondary-900 mt-6">Reviews</h4>
          <div className="mt-4">
            {session ? (
              <WriteReview id={book.id} />
            ) : (
              <Link
                href="/signin"
                className="bg-secondary-500 rounded-md px-4 py-2 hover:bg-secondary-600"
              >
                Sign in to write a review
              </Link>
            )}
          </div>

          <div className="mt-10">
            {reviewsWithUsers.length
              ? reviewsWithUsers.map(review => (
                  <div
                    key={review.text + review.user.id}
                    className="rounded-md bg-secondary-50 px-4 py-2"
                  >
                    <p className="text-secondary-900 text-sm font-semibold">{review.user.name}</p>
                    <p className="text-sm">{review.text}</p>
                  </div>
                ))
              : 'No reviews yet!'}
          </div>
        </div>
      </div>
    </div>
  );
}
