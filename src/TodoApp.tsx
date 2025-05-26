import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoBtn from "./components/TodoBtn";
import {TodoListSection,
  type SortOptions,
} from "./components/TodoListSection";
import DayNightToggle from "./components/DayNightToggle";
import { useTodos } from "./components/CustomHook";
import type { Todo } from "./components/Types";

const TodoApp = () => {
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
  );
  const [sortBy, setSortBy] = useState<SortOptions>("recent");
  const { todos, handleAddTodo, handleDeleteTodo, handleEditTodo } = useTodos();
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="todo-app">
      <TodoForm
        onAddTodo={handleAddTodo}
        todoToEdit={todoToEdit}
        onEditTodo={async (updatedTodo) => {
          await handleEditTodo(updatedTodo.id, updatedTodo);
        }}
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
      />
      <div className="actions-btn">
        <TodoBtn
          onAddTaskClick={() => setTodoToEdit(null)}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className="todo-list-section">
        <TodoListSection
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={(todo) => {
            setTodoToEdit(todo);
          }}
          onToggleDone={(id: number, done: boolean) => {
            const todoItem = todos.find((todo) => todo.id === id);
            if (todoItem) {
              handleEditTodo(id, { ...todoItem, done });
              setTodoToEdit(null);
            }
          }}
          sortBy={sortBy}
        />
      </div>
      <DayNightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default TodoApp;
