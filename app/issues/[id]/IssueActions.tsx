"use client";

import { Button, Flex } from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon, CheckIcon, StopwatchIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';

interface IssueActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: string) => Promise<void>;
}

const IssueActions = ({ onEdit, onDelete, onStatusChange }: IssueActionsProps) => {
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);

  const handleStatus = async (status: string) => {
    if (statusLoading) return; // Prevent double click
    setStatusLoading(status);
    if (onStatusChange) await onStatusChange(status);
    setCurrentStatus(status); // update local status
    setStatusLoading(null);
  };

  return (
    <Flex gap="3" className="mt-2 flex-wrap">
      <Button onClick={onEdit} variant="soft" color="indigo" className="hover:scale-105 transition-transform duration-200">
        <Pencil2Icon className="mr-2" /> Edit
      </Button>
      <Button onClick={onDelete} variant="soft" color="red" className="hover:scale-105 transition-transform duration-200">
        <TrashIcon className="mr-2" /> Delete
      </Button>
      <Button
        onClick={() => handleStatus('IN_PROGRESS')}
        variant="soft"
        color="blue"
        className="hover:scale-105 transition-transform duration-200"
        disabled={statusLoading === 'IN_PROGRESS' || currentStatus === 'IN_PROGRESS'}
      >
        <StopwatchIcon className="mr-2" />
        {statusLoading === 'IN_PROGRESS' ? <span style={{ marginLeft: 8 }}><Spinner /></span> : 'Mark In Progress'}
      </Button>
      <Button
        onClick={() => handleStatus('CLOSED')}
        variant="soft"
        color="green"
        className="hover:scale-105 transition-transform duration-200"
        disabled={statusLoading === 'CLOSED' || currentStatus === 'CLOSED'}
      >
        <CheckIcon className="mr-2" />
        {statusLoading === 'CLOSED' ? <span style={{ marginLeft: 8 }}><Spinner /></span> : 'Mark Closed'}
      </Button>
    </Flex>
  );
};

export default IssueActions;
