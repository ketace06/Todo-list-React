import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoBtn from "./TodoBtn";
import { TodoListSection, type SortOptions } from "./TodoListSection";
import { useTodos } from "./CustomHook";
import type { Todo } from "./Types";

const HomePage = () => {
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState<SortOptions>("recent");
  const { todos, handleAddTodo, handleDeleteTodo, handleEditTodo } = useTodos();

  return (
    <>
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
    </>
  );
};

export default HomePage;
