export type NewTask = {
  title: string;
  dueDate: string;
  completed: boolean;
};

export type Task = NewTask & {
  id: number;
};
