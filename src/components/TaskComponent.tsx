"use client";

import { BookOpen, Check, Link, List, Plus, X } from "lucide-react";
import { FC, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface TaskComponentProps {}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Reference {
  id: string;
  title: string;
  url: string;
}

// - In Progress

// - [x] Adding markdown format for the notes. Obsidian (write and preview on the same place)
// - [ ] Make the view split (on the the markdown for notes, and on the left todos and reference materials list)

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const TaskComponent: FC<TaskComponentProps> = ({}) => {
  const initialTodos: Todo[] = [
    {
      id: "1",
      text: "todo one",
      completed: false,
    },
    {
      id: "2",
      text: "todo two",
      completed: false,
    },
    {
      id: "3",
      text: "todo three",
      completed: true,
    },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [notes, setNotes] = useState("");
  const [newTodoText, setNewTodoText] = useState("");
  const [references, setReferences] = useState<Reference[]>([]);

  const [newRefTitle, setNewRefTitle] = useState("");
  const [newRefUrl, setNewRefUrl] = useState("");

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {};

  const handleKeyDown = () => {};

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addReference = () => {
    if (newRefTitle.trim() && newRefUrl.trim()) {
      const newReference: Reference = {
        id: Date.now().toString(),
        title: newRefTitle.trim(),
        url: newRefUrl.trim(),
      };
      setReferences([...references, newReference]);
      setNewRefTitle("");
      setNewRefUrl("");
    }
  };

  const deleteReference = (id: string) => {
    setReferences(references.filter((ref) => ref.id !== id));
  };

  return (
    <div className="min-h-screen bg-[rgb(22, 22, 40)]">
      {/* ------- We need to split here ------- */}
      <div>
        <div>
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setTitle(e.currentTarget.textContent || "")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="text-4xl font-bold text-white focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none mb-2"
                data-placeholder="Untitled Task"
              />
              <div
                ref={descriptionRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) =>
                  setDescription(e.currentTarget.textContent || "")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="text-lg text-slate-300 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
                data-placeholder="Add a description for this task..."
              />
            </div>
          </div>

          {/* Main Content Split View */}
          <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-6 py-12">
            {/* LEFT: Todos + References  */}
            {/* <div className="max-w-4xl mx-auto px-6 py-12 space-y-8"> */}
            <div className="flex-1 space-y-8">
              {/* Todos Section */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <List className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">
                    Todo Items
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="flex-shrink-0 w-5 h-5 border-2 border-white/30 rounded flex items-center justify-center hover:border-green-400 transition-colors"
                      >
                        {todo.completed && (
                          <Check className="w-3 h-3 text-green-400" />
                        )}
                      </button>
                      <span
                        className={`flex-grow text-white ${
                          todo.completed ? "line-through text-slate-400" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Add new todo item..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    onClick={addTodo}
                    disabled={!newTodoText.trim()}
                    className="w-full disabled:bg-white/10 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-6 transition-all duration-200 transform disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Todo
                  </button>
                </div>
              </div>

              {/* References Section */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Link className="w-6 h-6 text-orange-400" />
                  <h2 className="text-2xl font-semibold text-white">
                    References
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {references.map((ref) => (
                    <div
                      key={ref.id}
                      className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                    >
                      <Link className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline block truncate"
                        >
                          {ref.title}
                        </a>
                        <span className="text-xs text-slate-400 block truncate">
                          {ref.url}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteReference(ref.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={newRefTitle}
                    onChange={(e) => setNewRefTitle(e.target.value)}
                    placeholder="Reference title..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-transparent transition-all duration-200"
                  />
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={newRefUrl}
                      onChange={(e) => setNewRefUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addReference()}
                      placeholder="https://example.com"
                      className="flex-grow px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      onClick={addReference}
                      disabled={!newRefTitle.trim() || !newRefUrl.trim()}
                      className="disabled:bg-white/10 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-6 transition-all duration-200 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Notes Section */}
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-semibold text-white">Notes</h2>
                </div>
                <div>
                  <MDEditor
                    value={notes}
                    onChange={(val) => setNotes(val || "")}
                    height={300}
                  />
                </div>

                {/* <div
            ref={notesRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setNotes(e.currentTarget.textContent || "")}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[200px] px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-transparent transition-all duration-200 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
            data-placeholder="Add your notes, thoughts, or additional information here..."
          /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            {todos.filter((t) => t.completed).length} of {todos.length} todos
            completed • {references.length} reference
            {references.length !== 1 ? "s" : ""} added
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
