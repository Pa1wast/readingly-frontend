'use client';

import { Loader } from 'lucide-react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';

function SubmitButton({ children, className }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={twMerge(
        'bg-green-500 rounded-md flex justify-center disabled:opacity-65 disabled:pointer-events-none',
        className
      )}
      type="submit"
      disabled={pending}
    >
      {pending ? <Loader className="rotate size-5 text-green-900" /> : children}
    </button>
  );
}

export default SubmitButton;
