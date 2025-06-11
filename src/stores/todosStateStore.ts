import { create } from "zustand";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
} from "../components/assets/api/Api";
import type { NewTodo, Todo } from "../components/Types";
import { SortOptions } from "../components/TodoListSection";

type TodosState = {
  todos: Todo[];
  todoToEdit: Todo | null;
  sortBy: SortOptions;
  setTodoToEdit: (todo: Todo | null) => void;
  setSortBy: (sortBy: SortOptions) => void;
  loadTodos: () => Promise<void>;
  handleAddTodo: (
    newTodo: NewTodo,
    categoryId?: string | null,
  ) => Promise<NewTodo>;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleEditTodo: (
    id: number,
    updatedTodo: NewTodo,
    categoryId?: string | null,
  ) => Promise<void>;
};

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  todoToEdit: null,
  sortBy: "recent",

  setTodoToEdit: (todo) => set({ todoToEdit: todo }),
  setSortBy: (sortBy) => set({ sortBy }),

  loadTodos: async () => {
    const todos = await fetchTodos();
    set({ todos });
  },

  handleAddTodo: async (newTodo, categoryId) => {
    const createdTodo = await addTodo(newTodo, categoryId);
    await get().loadTodos();
    return createdTodo;
  },

  handleDeleteTodo: async (id) => {
    await deleteTodo(id.toString());
    await get().loadTodos();
  },

  handleEditTodo: async (id, updatedTodo, categoryId) => {
    const { title, due_date, content, done } = updatedTodo;
    await editTodo({ title, due_date, content, done }, id, categoryId);
    await get().loadTodos();
  },
}));
