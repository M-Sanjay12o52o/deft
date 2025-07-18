"use client";

import { use, useEffect, useState } from "react";

// In Progress

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
      <h1>Sub Task Page</h1>
    </div>
  );
}
