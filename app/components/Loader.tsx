import { Book } from 'lucide-react';

export default function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex gap-1 items-center flex-col">
        <Book className="bouncy" />
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    </div>
  );
}
