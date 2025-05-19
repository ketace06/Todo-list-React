import './App.css';
import React from 'react';

const TodoApp = () => {
  return (
    <div className="todo-app">
      <h1 className='title'>TODO LIST</h1>
      <form className="todo-form-popup">
        <h1>Create Task</h1>
        <div className='form'>
          <p className='p-form'>Title*</p>
          <input className='input-text' type="text" placeholder="What will you do?" autoComplete='off'/>
        </div>
        <div className='form'>
          <p className='p-form'>Category</p>
          <input className='input-text' type="text" placeholder="Choose a category" autoComplete='off'/>
        </div>
        <div className='form'>
          <p className='p-form'>Date</p>
          <input className='input-text' type='date' />
        </div>
        <div className='form'>
          <p className='p-form'>Description</p>
          <textarea className='p-description' placeholder="Add a description" autoComplete='off'/>
        </div>
        <button className="simple-button" type="submit">Create</button>
        <button className="simple-button clear-all" type="submit">Clear all tasks</button>
      </form>
      
      <div className="todo-list-section">
        <div className='add-filter'>
        <button
          className="simple-button"
          type="button"
          onClick={() => {
            const form = document.querySelector('.todo-form-popup') as HTMLElement;
            if (form) form.classList.add('show');
          }} 
        >
          Add a Task
        </button>
        <select className='select-filter'>
          <option value="All">All</option>
          <option value="By date">Date</option>
          <option value="etc">Priority</option>
          <option value="etc">Categories</option>
          <option value="etc">Status</option>
        </select>
      </div>
        <ul className="todo-list">
          <h2>Recently added</h2>
          <li className="task-item">
            <input className="checkboxes" type="checkbox" />
            <div className="task-info">
              <span className="task-title">Task 1</span>
              <span className="due-date">Due: 2025-05-19</span>
            </div>
            <div className="delete-edit-button">
              <button className="Delete" type="button">🗑️</button>
              <button className="Edit" type="button">✏️</button>
            </div>
          </li>
          <li className="task-item">
            <input className="checkboxes" type="checkbox" />
            <div className="task-info">
              <span className="task-title"><s>Task done</s></span>
              <span className="due-date">Due: 2025-05-19</span>
            </div>
            <div className="delete-edit-button">
              <button className="Delete" type="button">🗑️</button>
              <button className="Edit" type="button">✏️</button>
            </div>
          </li>
        </ul>
      </div>
      <p className='ErrorText'>
        Error: don't do that!
      </p>
      <div className="todo-footer">
        <p>Just do it!</p>
      </div>
    </div>
  );
};

export default TodoApp;
