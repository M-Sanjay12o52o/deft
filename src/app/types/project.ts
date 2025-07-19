export type Task = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
};

export type Project = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string | null;
  priority: number;
  dueDate: string | null;
  authorId: number | null;
  tasks: Task[];
};
