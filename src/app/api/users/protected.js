import { withAuth, withAdmin } from '@/middleware/auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Auth middleware logic should be applied here if needed
  const users = await User.find().select('-password');
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}
