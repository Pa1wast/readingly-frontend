import { twMerge } from 'tailwind-merge';
import { removeFromAllShelves, toggleBookShelf } from '../lib/actions';
import { auth } from '../lib/auth';
import SubmitButton from './SubmitButton';
import { Check } from 'lucide-react';

async function RecommendedBookCardActions({ id }) {
  const session = await auth();

  const wantToReadBooks = session?.user?.wantToReadBooks;
  const notInterestedBooks = session?.user?.notInterestedBooks;

  const isInWantTo = wantToReadBooks?.some(bookId => bookId === id);
  const isInNotInterested = notInterestedBooks?.some(bookId => bookId === id);

  return (
    <>
      <form action={toggleBookShelf} className="text-sm  flex flex-col  gap-1">
        <input hidden name="book-id" value={id} readOnly />
        <input hidden name="shelf" value="want-to-read" readOnly />

        {!isInNotInterested &&
          (isInWantTo ? (
            <button
              className={twMerge(
                'p-1 gap-2 w-max bg-green-500 rounded-md flex justify-center disabled:opacity-65 disabled:pointer-events-none',
                isInWantTo && 'bg-green-50 hover:bg-green-100'
              )}
              disabled
            >
              <Check className="size-5" />
              <span>Want to Read</span>
            </button>
          ) : (
            <SubmitButton
              className={twMerge(
                ' flex gap-2 w-max p-1 hover:bg-green-400',
                isInWantTo && 'bg-green-500 hover:bg-green-400'
              )}
            >
              <span>Want to Read</span>
            </SubmitButton>
          ))}
      </form>

      {!isInNotInterested ? (
        <form action={toggleBookShelf} className="text-sm  flex flex-col w-max gap-1">
          <input hidden name="book-id" value={id} readOnly />
          <input hidden name="shelf" value="not-interested" readOnly />
          <SubmitButton className="py-1 bg-transparent text-red-800 hover:text-red-600">
            Not interested
          </SubmitButton>
        </form>
      ) : (
        <form action={removeFromAllShelves}>
          <input hidden name="book-id" value={id} readOnly />
          <SubmitButton className="bg-red-100 rounded-md text-sm text-red-900 hover:bg-red-200 py-1 w-full">
            Undo
          </SubmitButton>
        </form>
      )}

      {/* {isInWantTo && (
        <form action={removeFromAllShelves}>
          <input hidden name="book-id" value={id} readOnly />
          <SubmitButton className="bg-red-100 rounded-md text-sm text-red-900 hover:bg-red-200 py-1 w-full">
            Remove
          </SubmitButton>
        </form>
      )} */}
    </>
  );
}

export default RecommendedBookCardActions;
