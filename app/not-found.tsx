import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex-col items-center justify-center gap-6 flex">
        <div className="md:text-3xl text-xl text-primary-900 flex items-center gap-3">
          <span>(404) Page Not Found</span>
          <Frown />
        </div>
        <Link
          href="/"
          className="text-primary-900 bg-secondary-400 p-2 rounded-md text-center hover:bg-secondary-200"
        >
          Go to home &rarr;
        </Link>
      </div>
    </div>
  );
}
