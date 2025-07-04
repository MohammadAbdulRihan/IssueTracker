"use client";

import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Issue, Status } from "@prisma/client";

const statusLabels: Record<Status, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  CLOSED: "Closed",
};

const StatusChangeButtons = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<Status | null>(null);

  const handleChangeStatus = async (status: Status) => {
    setLoading(status);
    try {
      await axios.patch(`/api/issues/${issue.id}`, { status });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <Flex direction="column" gap="2">
      <Button
        onClick={() => handleChangeStatus("IN_PROGRESS")}
        disabled={issue.status === "IN_PROGRESS" || loading === "IN_PROGRESS"}
      >
        {loading === "IN_PROGRESS" ? "Updating..." : "Mark In Progress"}
      </Button>
      <Button
        color="green"
        onClick={() => handleChangeStatus("CLOSED")}
        disabled={issue.status === "CLOSED" || loading === "CLOSED"}
      >
        {loading === "CLOSED" ? "Updating..." : "Mark Closed"}
      </Button>
    </Flex>
  );
};

export default StatusChangeButtons;
