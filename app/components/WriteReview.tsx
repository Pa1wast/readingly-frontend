import { addReview } from '../lib/actions';
import SubmitButton from './SubmitButton';

export default function WriteReview({ id }) {
  return (
    <form action={addReview}>
      <p>Write a review</p>
      <input hidden name="book-id" value={id} readOnly />
      <textarea
        name="review"
        className="w-full px-2 py-1 border-secondary-100 border-2 rounded-md"
      />
      <SubmitButton className="px-4 bg-secondary-500 hover:bg-secondary-600 py-1">
        Submit
      </SubmitButton>
    </form>
  );
}
