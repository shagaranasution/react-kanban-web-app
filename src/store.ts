import type { Task, Tasks } from './types';
import { createWithEqualityFn } from 'zustand/traditional';
import type { StateCreator } from 'zustand';

type Store = {
  tasks: Tasks;
  addTask: (title: Task['title'], status: Task['status']) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: StateCreator<Store> = (set) => ({
  tasks: [
    {
      title: 'TestTask',
      status: 'PLANNED',
    },
    {
      title: 'TestTask2',
      status: 'ONGOING',
    },
  ],
  addTask: (title, status) =>
    set((store) => ({ tasks: [...store.tasks, { title, status }] })),
});

export const useStore = createWithEqualityFn(store);
