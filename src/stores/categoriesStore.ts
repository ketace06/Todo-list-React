import { create } from "zustand";

import {
  fetchCategories,
  addCategory,
  clearAllCategories,
} from "../components/assets/api/Api";
import type { Category, CategoryInsert } from "../components/Types";
import { notifyError, notifySuccess } from "../components/UserNotifications";

type CategoriesState = {
  categories: Category[];
  loading: boolean;
  isCategoryFormOpen: boolean;

  loadCategories: () => Promise<void>;
  openCategoryForm: () => void;
  closeCategoryForm: () => void;

  createCategory: (newCategory: CategoryInsert) => Promise<void>;
  clearCategories: () => Promise<void>;
};

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  loading: true,
  isCategoryFormOpen: false,

  loadCategories: async () => {
    set({ loading: true });
    try {
      const data = await fetchCategories();
      set({ categories: data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      notifyError("Error loading categories.");
    } finally {
      set({ loading: false });
    }
  },

  openCategoryForm: () => set({ isCategoryFormOpen: true }),
  closeCategoryForm: () => set({ isCategoryFormOpen: false }),

  createCategory: async (newCategory) => {
    try {
      await addCategory(newCategory);
      await get().loadCategories();
      get().closeCategoryForm();
      notifySuccess("Category created!");
    } catch (error) {
      console.error("Failed to add category:", error);
      notifyError("Error creating category. Check your internet connection...");
    }
  },

  clearCategories: async () => {
    if (get().categories.length === 0) {
      notifySuccess("You haven't created categories...");
      return;
    }
    set({ loading: true });
    try {
      await clearAllCategories();
      set({ categories: [] });
      notifySuccess("The categories have been successfully deleted!");
    } catch (error) {
      console.error("Failed to clear categories:", error);
      notifyError("Error clearing categories.");
    } finally {
      set({ loading: false });
    }
  },
}));

type CategoryFormState = {
  title: string;
  color: string;
  loading: boolean;
  setTitle: (title: string) => void;
  setColor: (color: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
};

export const useCategoryFormStore = create<CategoryFormState>((set) => ({
  title: "",
  color: "#cccccc",
  loading: false,
  setTitle: (title) => set({ title }),
  setColor: (color) => set({ color }),
  setLoading: (loading) => set({ loading }),
  reset: () =>
    set({
      title: "",
      color: "#cccccc",
      loading: false,
    }),
}));
