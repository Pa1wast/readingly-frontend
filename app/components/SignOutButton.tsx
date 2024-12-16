import { LogOut } from 'lucide-react';
import { signOutAction } from '../lib/actions';
import SubmitButton from './SubmitButton';
import { twMerge } from 'tailwind-merge';

export default function SignOutButton({ className }: { className?: string }) {
  return (
    <form
      action={signOutAction}
      className={twMerge(
        'md:p-3 md:m-2 hidden md:block md:rounded-md md:mt-auto md:hover:bg-secondary-200  md:mb-6',
        className
      )}
    >
      <SubmitButton className="flex gap-2  items-center font-semibold bg-transparent w-full h-full md:hover:bg-secondary-200">
        <LogOut className="size-4" /> Sign out
      </SubmitButton>
    </form>
  );
}
