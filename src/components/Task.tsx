import './Task.css';

import type { Task } from '../types';

type Props = {
  title: Task['title'];
  status: Task['status'];
};

export default function Task({ title, status }: Props) {
  return (
    <div className="task">
      <div>{title}</div>
      <div className={`status ${status}`}>{status}</div>
    </div>
  );
}
