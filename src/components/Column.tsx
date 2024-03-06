import React, { useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { shallow } from 'zustand/shallow';

type Props = {
  status: 'PLANNED' | 'ONGOING' | 'DONE';
};

function Column({ status }: Props) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.status === status),
    shallow
  );
  const addTask = useStore((store) => store.addTask);

  function handleSubmit() {
    if (text.trim().length <= 3) {
      return;
    }
    addTask(text, status);
    setText('');
    toggleModal();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function toggleModal() {
    setOpen(!open);
  }

  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{status}</p>
        <button onClick={toggleModal}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} status={task.status} key={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalBackdrop" onClick={toggleModal} />
          <div className="modalContent">
            <input
              placeholder="Enter a task.."
              onChange={handleInputChange}
              value={text}></input>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
