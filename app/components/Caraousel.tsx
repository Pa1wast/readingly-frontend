import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Caraousel({
  children,
  gap = 'gap-2',
}: {
  children: ReactNode;
  gap?: string;
}) {
  return <div className={twMerge('flex overflow-x-auto h-max', gap)}>{children}</div>;
}
