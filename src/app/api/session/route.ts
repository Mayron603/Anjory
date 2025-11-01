
import { cookies } from 'next/headers';
import { decrypt } from '@/app/actions';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookie = cookies().get('session')?.value;
  if (!cookie) {
    return NextResponse.json(null, { status: 401 });
  }

  const session = await decrypt(cookie);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(session);
}

    
