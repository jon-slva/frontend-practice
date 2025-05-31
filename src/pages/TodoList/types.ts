export type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
};

export type AddedTask = {
  title: string;
  dueDate: string;
  completed: boolean;
};
