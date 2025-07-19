"use client";
import { FC, useState, useRef, KeyboardEvent } from "react";
import {
  Plus,
  X,
  Check,
  Square,
  Link,
  FileText,
  List,
  BookOpen,
} from "lucide-react";

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

const TaskComponent: FC<TaskComponentProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newRefTitle, setNewRefTitle] = useState("");
  const [newRefUrl, setNewRefUrl] = useState("");

  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    // Auto-save functionality could be implemented here
    console.log("Auto-saving...");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.currentTarget.blur();
    }
  };

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
      const newRef: Reference = {
        id: Date.now().toString(),
        title: newRefTitle.trim(),
        url: newRefUrl.trim(),
      };
      setReferences([...references, newRef]);
      setNewRefTitle("");
      setNewRefUrl("");
    }
  };

  const deleteReference = (id: string) => {
    setReferences(references.filter((ref) => ref.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
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

      {/* Description */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-300">Description</h2>
        </div>
        <div
          ref={descRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setDescription(e.currentTarget.textContent || "")}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-lg focus:outline-none bg-gray-800 rounded-lg p-4 min-h-[100px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 empty:before:pointer-events-none"
          data-placeholder="Add a description for this task..."
        />
      </div>

      {/* Todos */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <List className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-semibold text-gray-300">Todo Items</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 mb-2 group">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-600 flex items-center justify-center hover:border-green-400 transition-colors"
              >
                {todo.completed ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : null}
              </button>
              <span
                className={`flex-grow ${
                  todo.completed ? "line-through text-gray-500" : "text-white"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add new todo item..."
              className="flex-grow bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-300">Notes</h2>
        </div>
        <div
          ref={notesRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setNotes(e.currentTarget.textContent || "")}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-base focus:outline-none bg-gray-800 rounded-lg p-4 min-h-[150px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 empty:before:pointer-events-none"
          data-placeholder="Add your notes, thoughts, or additional information here..."
        />
      </div>

      {/* References */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Link className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-semibold text-gray-300">References</h2>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          {references.map((ref) => (
            <div key={ref.id} className="flex items-center gap-3 mb-2 group">
              <Link className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div className="flex-grow">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline block"
                >
                  {ref.title}
                </a>
                <span className="text-xs text-gray-500">{ref.url}</span>
              </div>
              <button
                onClick={() => deleteReference(ref.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="space-y-2 mt-4">
            <input
              type="text"
              value={newRefTitle}
              onChange={(e) => setNewRefTitle(e.target.value)}
              placeholder="Reference title..."
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <input
                type="url"
                value={newRefUrl}
                onChange={(e) => setNewRefUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addReference()}
                placeholder="https://example.com"
                className="flex-grow bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addReference}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
