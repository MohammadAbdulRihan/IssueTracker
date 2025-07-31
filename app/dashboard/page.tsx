import prisma from '@/prisma/client';
import DashboardPageClient from './page.client';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);  
  //@ts-ignore
  const user = session?.user as typeof session.user & { id: string };
  const open = await prisma.issue.count({
    where: { status: 'OPEN',userId:user.id },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS',userId:user.id },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED',userId:user.id },
  });
  const latestIssues = await prisma.issue.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <DashboardPageClient
      open={open}
      inProgress={inProgress}
      closed={closed}
      latestIssues={latestIssues}
    />
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard | Issue Tracker',
  description: 'Project dashboard with stats and latest issues',
};
