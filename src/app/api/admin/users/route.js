import { withAdmin } from '@/middleware/auth';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Admin middleware logic should be applied here if needed
  const users = await User.find().select('+password -__v');
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}
