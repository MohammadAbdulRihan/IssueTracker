import prisma from '@/prisma/client';
import DashboardPageClient from './page.client';
import { Metadata } from 'next';

export default async function DashboardPage() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });
  const latestIssues = await prisma.issue.findMany({
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
