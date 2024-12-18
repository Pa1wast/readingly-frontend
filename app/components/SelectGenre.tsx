'use client';

import { Box, Check } from 'lucide-react';
import { toggleGenre } from '../lib/actions';
import SubmitButton from './SubmitButton';
import { twMerge } from 'tailwind-merge';

export default function SelectGenre({ id, value, title, selectedGenres }) {
  const isSelected = selectedGenres.some(genreId => genreId === id);

  async function onSubmit(formData) {
    await toggleGenre(id);
  }

  return (
    <form
      action={onSubmit}
      className="flex items-center gap-1 bg-secondary-50 p-2 rounded-md border border-primary-200 text-primary-900"
    >
      <SubmitButton className="bg-primary-100">
        <div
          className={twMerge(
            'w-4 h-4 flex items-center justify-center rounded-sm border border-primary-900 bg-primary-50 hover:bg-primary-100',
            isSelected && 'bg-primary-500'
          )}
        >
          {isSelected && <Check className="size-4" />}
        </div>
      </SubmitButton>

      <label>{title}</label>
    </form>
  );
}
