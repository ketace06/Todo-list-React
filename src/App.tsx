import './App.css';
import React from 'react';

const TodoApp = () => {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <form className="todo-form">
        <input type="text" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {}
      </ul>
      <div className="todo-footer">
        {}
      </div>
    </div>
  );
};

export default TodoApp;
