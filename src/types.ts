export type Task = {
  title: string;
  status: 'PLANNED' | 'ONGOING' | 'DONE';
};

export type Tasks = Task[];
