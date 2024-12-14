import { Suspense } from 'react';
import { Loader } from 'lucide-react';
import UserBooksList from '@/app/components/UserBooksList';
import FilterBooks from '../components/FilterBooks';

export const metadata = { title: 'Readingly - My Books' };

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <div className="md:px-6 py-8  px-4 sm:px-6 space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <h1 className="text-2xl  uppercase text-primary-900 font-semibold">My Books</h1>

        <FilterBooks activeFilter={searchParams?.filter} />
      </div>

      <Suspense
        fallback={
          <Loader className="rotate absolute  right-[50%] mt-40 size-12 text-primary-300  translate-x-[-50%] translate-y-[-50%]" />
        }
      >
        <UserBooksList filter={params?.filter} />
      </Suspense>

      {/* <div className="w-full h-[1px] bg-secondary-100"></div>

      <h1 className="text-xl mx-2 md:mx-0 uppercase text-primary-900 mb-8 font-semibold">
        Want to Read
      </h1>
      <Suspense fallback={<Loader className="rotate text-secondary-900" />}>
        <Test />
      </Suspense>

      <div className="w-full h-[1px] bg-secondary-100"></div>

      <h1 className="text-xl mx-2 md:mx-0 uppercase text-primary-900 mb-8 font-semibold">
        Updates
      </h1>
      <Suspense fallback={<Loader className="rotate text-secondary-900" />}>
        <Test />
      </Suspense> */}
    </div>
  );
}
