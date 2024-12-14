'use client';

import { Compass, Library, Stars } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      name: 'Explore Books',
      href: '/',
      Icon: Compass,
    },
    {
      name: 'Recommendations',
      href: '/recommendations',
      Icon: Stars,
    },
    {
      name: 'My Books',
      href: '/mybooks',
      Icon: Library,
    },
  ];

  return (
    <ul className="flex justify-evenly md:gap-4 p-2 md:flex-col md:mt-20">
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={twMerge(
              'p-3  rounded  flex items-center gap-2 hover:bg-secondary-200',
              (pathname.includes(link.href) && link.href !== '/') ||
                (pathname === '/' && link.href === '/')
                ? 'bg-secondary-300 hover:bg-secondary-300'
                : ''
            )}
          >
            <link.Icon className="size-6 md:size-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
