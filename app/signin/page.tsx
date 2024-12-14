import SignInButton from '@/app/components/SignInButton';

export const metadata = {
  title: 'Readingly - Sign in',
};

export default function Page() {
  return (
    <div className="grid h-full place-items-center ">
      <div className="rounded-md px-4 py-3 flex flex-col gap-6 items-center">
        <h1 className="text-xl text-primary-900 font-semibold">
          You have to sign in to get access!
        </h1>
        <SignInButton />
      </div>
    </div>
  );
}
