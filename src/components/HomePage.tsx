import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoBtn from "./TodoBtn";
import { TodoListSection, type SortOptions } from "./TodoListSection";
import { useTodos } from "./CustomHook";
import type { Todo } from "./Types";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const sortParam = searchParams.get("sort") as SortOptions | null;
  const [sortBy, setSortBy] = useState<SortOptions>(sortParam || "recent");

  const { todos, handleAddTodo, handleDeleteTodo, handleEditTodo } = useTodos();

  useEffect(() => {
    if (sortBy !== sortParam) {
      searchParams.set("sort", sortBy);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, sortBy, sortParam]);

  return (
    <div className="home-page">
      <TodoForm
        onAddTodo={handleAddTodo}
        todoToEdit={todoToEdit}
        onEditTodo={async (updatedTodo) => {
          if (updatedTodo.id !== undefined) {
            await handleEditTodo(updatedTodo.id, updatedTodo);
          }
        }}
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        categories={[]}
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
            if (todo.id !== undefined) {
              setTodoToEdit(todo as Todo);
            }
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
    </div>
  );
};

export default HomePage;
