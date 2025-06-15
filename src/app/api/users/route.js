import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();
  const users = await User.find({}).select('-__v');
  return NextResponse.json({ success: true, data: users }, { status: 200 });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
