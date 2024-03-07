import './Task.css';

import type { Task } from '../types';
import { useStore } from '../store';

type Props = {
  title: Task['title'];
  status: Task['status'];
};

export default function Task({ title, status }: Props) {
  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);

  function handleDeleteTask() {
    deleteTask(title);
  }

  function handleDragStart() {
    setDraggedTask(title);
  }

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      <div>{title}</div>
      <div className="bottomWrapper">
        <i className="fa-regular fa-trash-can" onClick={handleDeleteTask}></i>
        <div className={`status ${status}`}>{status}</div>
      </div>
    </div>
  );
}
