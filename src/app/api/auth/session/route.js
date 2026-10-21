import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export async function GET(request) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = verifySessionToken(session);

  return NextResponse.json(
    { success: true, authenticated },
    { status: 200 }
  );
}
