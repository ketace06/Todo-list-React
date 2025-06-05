import { create } from "zustand";
import type { Category, Todo } from "../components/Types";

type TodoFormState = {
  title: string;
  date: string;
  content: string;
  category: string;
  categories: Category[];
  loadingCategories: boolean;
  loadingSubmit: boolean;
  hasChanged: boolean;
  todoToEdit: Todo | null;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
  setContent: (content: string) => void;
  setCategory: (category: string) => void;
  setCategories: (categories: Category[]) => void;
  setLoadingCategories: (loading: boolean) => void;
  setLoadingSubmit: (loading: boolean) => void;
  setHasChanged: (changed: boolean) => void;
  setTodoToEdit: (todo: Todo | null) => void;
  resetForm: () => void;
};

export const useTodoFormStore = create<TodoFormState>((set) => ({
  title: "",
  date: "",
  content: "",
  category: "",
  categories: [],
  loadingCategories: true,
  loadingSubmit: false,
  hasChanged: false,
  todoToEdit: null,
  setTitle: (title) => set({ title }),
  setDate: (date) => set({ date }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),
  setCategories: (categories) => set({ categories }),
  setLoadingCategories: (loadingCategories) => set({ loadingCategories }),
  setLoadingSubmit: (loadingSubmit) => set({ loadingSubmit }),
  setHasChanged: (hasChanged) => set({ hasChanged }),
  setTodoToEdit: (todoToEdit) => set({ todoToEdit }),
  resetForm: () =>
    set({
      title: "",
      date: "",
      content: "",
      category: "",
      hasChanged: false,
      loadingSubmit: false,
      todoToEdit: null,
    }),
}));

type TodoListState = {
  deletingId: number | null;
  togglingId: number | null;
  setDeletingId: (id: number | null) => void;
  setTogglingId: (id: number | null) => void;
};

export const useTodoListStore = create<TodoListState>((set) => ({
  deletingId: null,
  togglingId: null,
  setDeletingId: (id: number | null) => set(() => ({ deletingId: id })),
  setTogglingId: (id: number | null) => set(() => ({ togglingId: id })),
}));
