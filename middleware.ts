// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   return NextResponse.redirect(new URL('/', request.url));
// }

import { auth } from '@/app/lib/auth';
export const middleware = auth;

export const config = {
  matcher: ['/mybooks', '/recommendations'],
};
