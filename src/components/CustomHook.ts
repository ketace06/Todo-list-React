import { useEffect } from "react";
import { useTodosStore } from "../stores/todosStateStore";
import { useShallow } from "zustand/react/shallow";

export function useTodos() {
  const { todos, loadTodos, handleAddTodo, handleDeleteTodo, handleEditTodo } =
    useTodosStore(
      useShallow((state) => ({
        todos: state.todos,
        loadTodos: state.loadTodos,
        handleAddTodo: state.handleAddTodo,
        handleDeleteTodo: state.handleDeleteTodo,
        handleEditTodo: state.handleEditTodo,
      })),
    );

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return { todos, handleAddTodo, handleDeleteTodo, handleEditTodo };
}
