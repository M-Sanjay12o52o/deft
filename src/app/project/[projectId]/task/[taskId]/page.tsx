"use client";

import TaskComponent from "@/components/TaskComponent";
import { use, useEffect, useState } from "react";

// In Progress

// - [ ] implement note taking for the individual task (in the dedicated task page)

// Questions:

export default function page({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = use(params);

  console.log("taskId: ", taskId);

  return (
    <div className="min-h-screen bg-[rgb(22, 22, 40)] flex flex-col">
      <TaskComponent />
    </div>
  );
}
