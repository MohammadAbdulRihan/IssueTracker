import Link from "next/link";
import prisma from '@/prisma/client';
import { Metadata } from 'next';
// import dynamic from "next/dynamic";
import HomeClient from "./HomeClient";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return <HomeClient open={open} inProgress={inProgress} closed={closed} />;
}

export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};