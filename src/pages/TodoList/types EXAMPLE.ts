export type NewTask = {
  title: string;
  dueDate: string;
  completed: boolean;
  tag?: string;
};

export type Task = NewTask & {
  id: number;
};
