import { LogOut } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { auth } from '@/app/lib/auth';
import NavLinks from '@/app/components/NavLinks';
import { signOutAction } from '@/app/lib/actions';
import SignOutButton from './SignOutButton';

export default async function Sidebar() {
  const session = await auth();

  return (
    <div className="row-start-3 md:border-r border-t border-primary-100 bg-secondary-50  md:col-start-1 md:row-start-1 md:row-span-2 md:flex md:flex-col md:gap-8">
      <div className="font-bold text-2xl hidden md:block md:self-center md:mt-4">
        <span className="text-primary-500">read</span>
        <span>ingly</span>
      </div>

      <NavLinks />

      {session?.user && <SignOutButton />}

      <p
        className={twMerge(
          'hidden  md:block text-xs text-primary-700 md:mb-4  md:m-2',
          !session?.user && 'md:mt-auto'
        )}
      >
        &copy; All rights reserved {new Date().getFullYear()}
      </p>
    </div>
  );
}
