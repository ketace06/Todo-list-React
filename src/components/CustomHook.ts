import { useState, useEffect, useCallback } from "react";
import { fetchTodos, addTodo, deleteTodo, editTodo } from "../api/Api";
import type { NewTodo, Todo } from "../components/Types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(async () => {
    setTodos(await fetchTodos());
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);
  const handleAddTodo = async (
    newTodo: NewTodo,
    categoryId?: string | null,
  ) => {
    const createdTodo = await addTodo(newTodo, categoryId);
    loadTodos();
    return createdTodo;
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id.toString());
    loadTodos();
  };
  const handleEditTodo = async (
    id: number,
    updatedTodo: NewTodo,
    categoryId?: string | null,
  ) => {
    const { title, due_date, content, done } = updatedTodo;
    await editTodo({ title, due_date, content, done }, id, categoryId);
    loadTodos();
  };

  return { todos, handleAddTodo, handleDeleteTodo, handleEditTodo };
}
