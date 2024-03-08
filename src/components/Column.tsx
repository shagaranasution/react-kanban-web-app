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
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.status === status),
    shallow
  );
  const addTask = useStore((store) => store.addTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);

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

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    setDrop(true);
    event.preventDefault();
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    setDrop(false);
    event.preventDefault();
  }

  function handleOnDrop() {
    setDrop(false);
    setDraggedTask(null);
    moveTask(draggedTask ?? '', status);
  }

  function toggleModal() {
    setOpen(!open);
  }

  return (
    <div
      className={`column ${drop && 'drop'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleOnDrop}>
      <div className="titleWrapper">
        <p>{status}</p>
        <button onClick={toggleModal}>Add</button>
      </div>
      {tasks.length === 0 && <p className="emptyPlaceholderText">No items</p>}
      {tasks.map((task, index) => (
        <Task
          title={task.title}
          status={task.status}
          key={task.title + index.toString()}
        />
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
