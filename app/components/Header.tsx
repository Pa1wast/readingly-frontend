import Image from 'next/image';
import { auth } from '@/app/lib/auth';
import Logo from '@/app/components/Logo';
import SignInButton from '@/app/components/SignInButton';

export default async function Header() {
  const session = await auth();

  return (
    <div className="bg-secondary-50 flex justify-between px-3 py-2 items-center md:col-start-2 border-primary-100 border-b">
      <Logo />

      {!session ? (
        <div className="ml-auto">
          <SignInButton />
        </div>
      ) : (
        <div className="flex items-center gap-2 ml-auto">
          <p className="text-xs font-semibold text-primary-900">{session?.user.name}</p>
          <Image
            className="rounded-full"
            src={
              session?.user.image ??
              'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
            }
            width={35}
            height={35}
            alt={session?.user.name ?? 'User profile picture'}
          />
        </div>
      )}
    </div>
  );
}
