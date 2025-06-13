import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoBtn from "./TodoBtn";
import { TodoListSection, type SortOptions } from "./TodoListSection";
import { useTodosStore } from "../stores/todosStateStore";
import { Todo } from "./Types";
import { useShallow } from "zustand/react/shallow";
import { useTodoFormUIStore } from "../stores/todoFormStore";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    todoToEdit,
    setTodoToEdit,
    sortBy,
    setSortBy,
    loadTodos,
  } = useTodosStore(
    useShallow((state) => ({
      todos: state.todos,
      handleAddTodo: state.handleAddTodo,
      handleDeleteTodo: state.handleDeleteTodo,
      handleEditTodo: state.handleEditTodo,
      todoToEdit: state.todoToEdit,
      setTodoToEdit: state.setTodoToEdit,
      sortBy: state.sortBy,
      setSortBy: state.setSortBy,
      loadTodos: state.loadTodos,
    })),
  );

  const { setOpen } = useTodoFormUIStore();

  useEffect(() => {
    setOpen(false);
    setTodoToEdit(null);
  }, [setOpen, setTodoToEdit]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const sortParam = searchParams.get("sort") as SortOptions | null;

  useEffect(() => {
    if (sortBy !== sortParam) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("sort", sortBy);
      setSearchParams(newParams);
    }
  }, [sortBy, sortParam, searchParams, setSearchParams]);

  return (
    <div className="home-page">
      <TodoForm
        onAddTodo={handleAddTodo}
        todoToEdit={todoToEdit}
        onEditTodo={async (updatedTodo, categoryId) => {
          if (updatedTodo.id !== undefined) {
            await handleEditTodo(updatedTodo.id, updatedTodo, categoryId);
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
              setTodoToEdit({ ...(todo as Todo) });
            }
          }}
          onToggleDone={async (id: number, done: boolean) => {
            const todoItem = todos.find((todo) => todo.id === id);
            if (todoItem) {
              await handleEditTodo(
                id,
                { ...todoItem, done },
                todoItem.category?.id ?? null,
              );
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
