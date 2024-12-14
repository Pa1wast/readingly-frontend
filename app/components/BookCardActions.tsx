import { twMerge } from 'tailwind-merge';
import { removeFromAllShelves, RemoveFromShelf, toggleBookShelf } from '../lib/actions';
import { auth } from '../lib/auth';
import SubmitButton from './SubmitButton';
import { revalidatePath } from 'next/cache';
import { XCircle } from 'lucide-react';

async function BookCardActions({ id }) {
  const session = await auth();

  const currentlyReadingBooks = session?.user?.currentlyReadingBooks;
  const wantToReadBooks = session?.user?.wantToReadBooks;
  const readBooks = session?.user?.readBooks;

  const isInCur = currentlyReadingBooks?.some(bookId => bookId === id);
  const isInWantTo = wantToReadBooks?.some(bookId => bookId === id);
  const isInRead = readBooks?.some(bookId => bookId === id);

  return (
    <>
      <form action={toggleBookShelf} className="text-sm  flex flex-col w-max gap-1">
        {isInCur && (
          <span className="bg-primary-200 rounded-lg px-2 py-1 text-xs w-max">
            Currently Reading
          </span>
        )}
        {isInWantTo && (
          <span className="bg-blue-200 rounded-lg px-2 py-1 text-xs w-max">Want to Read</span>
        )}
        {isInRead && <span className="bg-green-500 rounded-lg px-2 py-1 text-xs w-max">Read</span>}
        <input hidden name="book-id" value={id} readOnly />
        <select
          className="py-1 px-4  rounded-md bg-green-50 text-green-900"
          name="shelf"
          defaultValue=""
        >
          <option value="">Select a shelf</option>
          <option value="want-to-read" className="text-blue-500">
            Want to read
          </option>
          <option value="currently-reading" className="text-primary-500">
            Currently reading
          </option>
          <option value="read" className="text-green-700">
            Read
          </option>
        </select>
        <SubmitButton
          className={twMerge(
            'py-1',
            (isInCur || isInRead || isInWantTo) && 'bg-green-200 hover:bg-green-400'
          )}
        >
          {isInCur || isInRead || isInWantTo ? 'Change' : 'Add'}
        </SubmitButton>
      </form>

      {(isInCur || isInRead || isInWantTo) && (
        <form action={removeFromAllShelves}>
          <input hidden name="book-id" value={id} readOnly />
          <SubmitButton className="bg-red-100 rounded-md text-sm text-red-900 hover:bg-red-200 py-1 w-full">
            Remove
          </SubmitButton>
        </form>
      )}
    </>
  );
}

export default BookCardActions;
