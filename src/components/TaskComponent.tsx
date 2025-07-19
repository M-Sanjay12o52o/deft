"use client";

import { FC, useRef, useState } from "react";

interface TaskComponentProps {}

// In Progress

// - [ ] "contentEditable Title"
// - [ ] contentEditable description

// Bugs

// - [ ] Placeholder on the editableTitle is not showing

// Questions

const TaskComponent: FC<TaskComponentProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {};

  const handleKeyDown = () => {};

  return (
    <div className="p-6 bg-[rgb(22, 22, 40)] min-h-screen text-white">
      {/* Title */}
      <div className="mb-8">
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setTitle(e.currentTarget.textContent || "")}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-4xl font-bold focus:outline-none relative text-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 empty:before:pointer-events-none"
          data-placeholder="Untitled Task"
          style={{ minHeight: "3rem" }}
        />
      </div>

      <div className="mb-8">
        <div
          ref={descriptionRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setDescription(e.currentTarget.textContent || "")}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-xl font-semibold text-gray-500 focus:outline-none relative empty:before:content-[attr(data-placeholder)] empty:before:pointer-events-none"
          data-placeholder="No description"
          style={{ minHeight: "2rem" }}
        />
      </div>

      {/* Description */}
      {/* Notes */}
      {/* Todos */}
      {/* References */}
    </div>
  );
};

export default TaskComponent;
