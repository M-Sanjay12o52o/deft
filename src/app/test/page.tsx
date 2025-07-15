"use client";

import React, { useState } from "react";
import { Project } from "../types/project";

export default function page() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[][]>([]);

  const updateProject = (value: string) => {
    setProjectName(value);
  };

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
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Project Manager
          </h1>
          <p className="text-slate-300">Create and organize your projects</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Project Creation Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-12 shadow-2xl">
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
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!projectName.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              Create Project
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Your Projects
          </h2>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-slate-300 text-lg">No projects yet</p>
              <p className="text-slate-400 text-sm mt-2">
                Create your first project above to get started
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  /* - [ ] Fix this */
                  key={project[0].id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white font-medium">
                        {/* - [ ] Fix this */}
                        {project[0].title}
                      </span>
                    </div>
                    <div className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Active
                    </div>
                  </div>
                </div>
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
