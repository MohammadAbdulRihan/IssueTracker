import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '../../validationSchemas';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !('id' in session.user))
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Set userId to current user's id
  const user = session.user as typeof session.user & { id: string };
  console.log(user);
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description, userId: user.id },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !('id' in session.user))
    return NextResponse.json([], { status: 401 });

  // Only return issues for the current user
  const user = session.user as typeof session.user & { id: string };
  const issues = await prisma.issue.findMany({
    where: { userId: user.id },
  });


  return NextResponse.json(issues);
}
