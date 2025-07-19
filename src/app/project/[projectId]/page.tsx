"use client";

import { Project, Task } from "@/app/types/project";
import Link from "next/link";
import { use, useEffect, useState } from "react";

// In Progress
// - [ ] better ui for the project page
// - [x] dedicate page for the task
// - [x] checkbox on the list item for the individual task
// - [ ] add checkbox and style the checkbox better

// Questions:

export default function page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log("tasks: ", tasks);
  console.log("typeof tasks: ", typeof tasks);

  // TODO:
  // - [ ] get actual taskId
  const taskId = 1;

  console.log("project: ", project);
  console.log("project.task: ", project);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/project/${projectId}`);

      if (!res.ok) throw new Error("Failed to fetch project");

      const projectFromDB = await res.json();
      console.log("projectFromDB: ", projectFromDB);

      setProject(projectFromDB);
      setTasks(projectFromDB.tasks);
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
      <Link href={`/project/${projectId}/task/${taskId}`}>Add Task</Link>

      {/* List of Tasks*/}
      <h2 className="text-4xl font-bold text-white mb-2">List of Tasks</h2>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
        {" "}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="grid gap-4">
              <Link
                href={`/project/${projectId}/task/${taskId}`}
                className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <input type="checkbox" />
                  <span className="text-white font-medium">{task.title}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <span className="text-gray-400">No tasks yet</span>
        )}
      </div>
    </div>
  ) : (
    <div>Failed to fetch project</div>
  );
}
