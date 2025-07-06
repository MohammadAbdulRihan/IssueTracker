"use client";
import { Avatar, Card, Flex, Heading, Text, Separator } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import ReactMarkdown from 'react-markdown';
import IssueActions from './IssueActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleEdit = () => {
    router.push(`/issues/edit/${issue.id}`);
  };

  const handleDelete = async () => {
    setLoading('delete');
    await axios.delete(`/api/issues/${issue.id}`);
    router.push('/issues/list');
    router.refresh();
  };

  const handleStatusChange = async (status: string) => {
    setLoading('status');
    await axios.patch(`/api/issues/${issue.id}`, { status });
    router.refresh();
    setLoading(null);
  };

  return (
    <Card className="shadow-2xl rounded-2xl p-8 bg-gradient-to-br from-white to-blue-50 border border-blue-100 w-full min-h-screen flex flex-col justify-start">
      <Flex direction="column" gap="6" className="flex-1">
        <Flex align="center" justify="between" className="mb-4">
          <Heading size="6" className="text-blue-900 font-bold">
            {issue.title}
          </Heading>
          <IssueStatusBadge status={issue.status} />
        </Flex>
        <Flex align="center" gap="3" className="text-gray-500 text-sm mb-2">
          <Avatar fallback="U" size="2" radius="full" className="bg-blue-200" />
          <Text>Created: {issue.createdAt.toISOString().slice(0, 10)}</Text>
        </Flex>
        <Separator my="2" size="4" />
        <Card className="prose max-w-full bg-white/80 border border-blue-100 p-4 rounded-xl shadow-sm mb-4 w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
          <div className="w-full flex justify-center mt-6">
            <IssueActions
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </Card>
      </Flex>
    </Card>
  );
};

export default IssueDetails;
