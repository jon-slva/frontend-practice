export type Priority = "" | "Low" | "Med" | "High";

export type NewTask = {
  title: string;
  dueDate: string;
  completed: boolean;
  priority: Priority;
};

export type Task = NewTask & {
  id: number;
};
