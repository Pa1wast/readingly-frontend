'use client';

import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import starOutline from '@/public/star-outline.svg';
import starFill from '@/public/star-fill.svg';
import { rateBook } from '../lib/actions';

function Rating({
  id,
  bookRating = 0,
  size = 'md',
  className,
}: {
  id: string;
  bookRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [curIndex, setCurIndex] = useState<number | null>(null);

  useEffect(() => {
    setClickedIndex(bookRating > 0 ? bookRating - 1 : null);
  }, [bookRating]);

  function handleOver(e: React.MouseEvent<HTMLDivElement>) {
    const starIndex = e.currentTarget.getAttribute('data-star');
    if (starIndex !== null) setCurIndex(parseInt(starIndex, 10));
  }

  function handleLeave() {
    setCurIndex(null);
  }

  async function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const starIndex = e.currentTarget.getAttribute('data-star');
    if (starIndex !== null) {
      const index = parseInt(starIndex, 10);
      const newRating = clickedIndex === index ? 0 : index + 1;
      setClickedIndex(newRating === 0 ? null : index);

      await rateBook(id, newRating);
    }
  }

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="flex gap-1" onMouseLeave={handleLeave}>
      {[...Array(5)].map((_, i) => (
        <div
          className={twMerge('relative cursor-pointer', sizes[size], className)}
          key={i}
          data-star={i}
          onMouseOver={handleOver}
          onClick={handleClick}
        >
          <Image
            src={
              curIndex !== null
                ? i <= curIndex
                  ? starFill
                  : starOutline
                : i <= (clickedIndex ?? -1)
                ? starFill
                : starOutline
            }
            alt="Rating Star"
            fill
            className="absolute object-fill"
          />
        </div>
      ))}
    </div>
  );
}

export default Rating;
