"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "./types/project";
import { useRouter } from "next/navigation";

// In Progress

// Questions:

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [counter, setCounter] = useState<number | null>(null);
  const router = useRouter();

  const updateProject = (value: string) => {
    setProjectName(value);
  };

  const getProjects = async () => {
    let newVal = counter! + 1;

    setCounter(newVal);

    try {
      const res = await fetch("/api/projects");

      if (!res.ok) throw new Error("Failed to create project");

      const projectsFromDB = await res.json();

      setProjects(projectsFromDB);
      setProjectName("");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify({ title: projectName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to create project");

      const newProject = await res.json();
      setProjects((prev) => [...prev, newProject]);
      setProjectName("");

      router.push(`/project/${newProject.id}`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(22, 22, 40)] flex flex-col">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-2">DEFT</h1>
          <p className="text-slate-300 text-lg">
            Turn ideas into focused execution — track, reflect, and build with
            clarity.
          </p>
          <p className="text-slate-300 text-lg">
            DEFT helps you structure anything — projects, study plans, or deep
            learning journeys — into clear goals, subtasks, and focused
            execution.
          </p>
          <p className="text-slate-400 text-sm mt-2">
            Whether you're shipping apps or mastering subjects, break it down,
            track it, and make steady progress.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Project Creation Form */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 mb-12 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Create New Project
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="projectname"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Project Name
              </label>
              <input
                id="projectname"
                type="text"
                value={projectName}
                placeholder="Enter your project name"
                onChange={(e) => updateProject(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus::border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!projectName.trim()}
              className="w-full disabled:bg-white/10 bg-slate-600 text-white font-semibold py-4 px-6 transition-all duration-200 transform disabled:cursor-not-allowed disabled:transform-none shadow-lg cursor-pointer"
            >
              Create Project
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Your Projects
            </h2>
            <h3>Total Projects {projects.length}</h3>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-slate-300 text-lg">No projects yet</p>
              <p className="text-slate-400 text-sm mt-2">
                Create your first project above to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project, index) => (
                <Link
                  key={index}
                  href={`/project/${project.id}`}
                  className="text-white font-medium"
                >
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-black"></div>
                        <span className="text-white font-medium">
                          {project.title}
                        </span>
                      </div>
                      <div className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Active
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            {projects.length} project{projects.length !== 1 ? "s" : ""} created
          </p>
        </div>
      </div>
    </div>
  );
}
