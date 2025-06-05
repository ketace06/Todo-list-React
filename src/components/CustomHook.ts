import { useEffect } from "react";
import { useTodosStore } from "../stores/todosStateStore";

export function useTodos() {
  const { todos, loadTodos, handleAddTodo, handleDeleteTodo, handleEditTodo } =
    useTodosStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return { todos, handleAddTodo, handleDeleteTodo, handleEditTodo };
}
