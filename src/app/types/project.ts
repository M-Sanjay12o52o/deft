export type Project = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string | null;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: number;
  dueDate: string | null;
  authorId: number | null;
};
