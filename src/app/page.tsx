"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<string[]>([]);
  const [project, setProject] = useState("");

  const updateProject = (value: string) => {
    setProject(value);
  };

  const handleSubmit = () => {
    setProjects((prev) => [...prev, project]);
  };

  return (
    <div className="bg-red-700 h-screen w-screen flex items-center justify-center">
      <div>
        <input
          id="projectname"
          placeholder="Enter your project name"
          onChange={(e) => updateProject(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="text-black font-extrabold text-5xl bg-blue-700 h-24 w-100 rounded-md cursor-pointer"
        >
          Create a Project
        </button>
      </div>
      <div>
        {projects.map((projectName, index) => (
          <li key={index}>
            <Link
              href={`/project/${projectName}`}
              className="text-blue-300 text-3xl"
            >
              {projectName}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
