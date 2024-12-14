import { auth } from './lib/auth';
import Search from './components/Search';
import BookList from './components/BookList';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';

export default async function Home({ searchParams }) {
  const session = await auth();
  const params = await searchParams;

  return (
    <div className="relative">
      <div className="w-full fixed z-50 flex bg-secondary-50 border-b border-secondary-200">
        <Search />
      </div>

      <Suspense
        fallback={
          <Loader className="rotate absolute  right-[50%] mt-40 size-12 text-primary-300  translate-x-[-50%] translate-y-[-50%]" />
        }
      >
        <BookList searchParams={params} />
      </Suspense>
    </div>
  );
}
