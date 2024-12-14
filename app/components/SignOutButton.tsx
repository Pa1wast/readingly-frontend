import { LogOut } from 'lucide-react';
import { signOutAction } from '../lib/actions';
import SubmitButton from './SubmitButton';

export default function SignOutButton() {
  return (
    <form
      action={signOutAction}
      className="md:block hidden  md:p-3 md:m-2 md:rounded-md md:mt-auto md:hover:bg-secondary-200  md:mb-6"
    >
      <SubmitButton className="flex gap-2  items-center font-semibold bg-transparent w-full h-full md:hover:bg-secondary-200">
        <LogOut /> Sign out
      </SubmitButton>
    </form>
  );
}
