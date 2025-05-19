import './App.css';
import React from 'react';

const TodoApp = () => {
  return (
    <div className="todo-app">
      <h1>TODO LIST</h1>
      <div className='add-filter'>
        <button type='submit'>Add a Task</button>
        <select>
          <option value="All">All</option>
        </select>
      </div>
      <form className="todo-form-popup">
        <input type="text" placeholder="What will you do?" />
        <button type="submit">Add</button>
        <button type="submit">Clear all tasks</button>
      </form>
      <div>
      <input type='date' />
      </div>
      <h2>Recently added</h2>
      <ul className="todo-list">
        <li className="task-item">
          <input type="checkbox" />
          <div className="task-info">
        <span className="task-title">Task 1</span>
        <span className="due-date">Due: 2025-05-19</span>
        </div>
        <button className="Delete" type="submit">🗑️</button>
        <button className="Edit" type="submit">✏️</button>
        </li>
        <li className="task-item">
          <input type="checkbox" />
          <div className="task-info">
        <span className="task-title">Task 2</span>
        <span className="due-date">Due: 2025-05-19</span>
        </div>
        <button className="Delete" type="submit">🗑️</button>
        <button className="Edit" type="submit">✏️</button>
        </li>
        <li className="task-item">
          <input type="checkbox" />
          <div className="task-info">
        <span className="task-title">Task 3</span>
        <span className="due-date">Due: 2025-05-19</span>
        </div>
        <button className="Delete" type="submit">🗑️</button>
        <button className="Edit" type="submit">✏️</button>
        </li>
        <li className="task-item">
          <input type="checkbox" />
          <div className="task-info">
        <span className="task-title">Task 4</span>
        <span className="due-date">Due: 2025-05-19</span>
        </div>
        <button className="Delete" type="submit">🗑️</button>
        <button className="Edit" type="submit">✏️</button>
        </li>
      </ul>
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
