import { signInAction } from '@/app/lib/actions';
import SubmitButton from './SubmitButton';

export default function SignInButton() {
  return (
    <form action={signInAction}>
      <SubmitButton className="flex gap-2 items-center md:ml-auto bg-secondary-400 p-2 rounded-md">
        <p className="">
          Sign in with <span className="text-primary-700 font-semibold">Google</span>
        </p>
      </SubmitButton>
    </form>
  );
}
