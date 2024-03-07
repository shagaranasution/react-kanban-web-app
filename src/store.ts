import type { Task, Tasks } from './types';
import { createWithEqualityFn } from 'zustand/traditional';
import type { StateCreator } from 'zustand';

type Store = {
  tasks: Tasks;
  addTask: (title: Task['title'], status: Task['status']) => void;
  deleteTask: (title: Task['title']) => void;
  draggedTask: Task['title'] | null;
  setDraggedTask: (title: Task['title'] | null) => void;
  moveTask: (title: Task['title'], status: Task['status']) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: StateCreator<Store> = (set) => ({
  tasks: [],
  addTask: (title, status) => {
    set((store) => ({ tasks: [...store.tasks, { title, status }] }));
  },
  deleteTask: (title) => {
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    }));
  },
  draggedTask: null,
  setDraggedTask: (title) => {
    set({ draggedTask: title });
  },
  moveTask: (title, status) => {
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, status } : task
      ),
    }));
  },
});

export const useStore = createWithEqualityFn(store);
