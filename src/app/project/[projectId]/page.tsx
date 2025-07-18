"use client";

import { Project } from "@/app/types/project";
import Link from "next/link";
import { use, useEffect, useState } from "react";

// In Progress

// Questions:

export default function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [project, setProject] = useState<Project | null>(null);

  // TODO:
  // - [ ] get actual taskId
  const taskId = 1;

  console.log("project: ", project);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/project/${projectId}`);

      if (!res.ok) throw new Error("Failed to fetch project");

      const projectFromDB = await res.json();

      setProject(projectFromDB);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return project ? (
    <div className="min-h-screen bg-[rgb(22, 22, 40)] flex flex-col">
      <h1 className="text-4xl font-bold text-white mb-2">
        My Project: {project?.title ?? "Loading..."}
      </h1>
      <Link
        href={`/project/${projectId}/subtask/${taskId}`}
        className="bg-blue-300"
      >
        Add Sub-task
      </Link>

      {/* Input element to add tasks */}
      <div className="bg-yellow-700">
        <form action="">
          <input type="text" />
          <button>Add</button>
        </form>
      </div>

      {/* List of Sub-tasks */}
      <h2 className="text-4xl bg-red-700 font-bold text-white mb-2">
        List of Sub-tasks
      </h2>
    </div>
  ) : (
    <div>Failed to fetch project</div>
  );
}
