import { create } from "zustand";

type PopupSection = "overview" | "account" | "todo-form-popup" | null;

type SidebarState = {
  popupOpen: PopupSection;
  todoFormOpen: boolean;
  popupTranslateY: number;
  isClosing: boolean;
  hasRendered: boolean;
  setPopupOpen: (section: PopupSection) => void;
  setTodoFormOpen: (open: boolean) => void;
  setPopupTranslateY: (y: number) => void;
  setIsClosing: (closing: boolean) => void;
  setHasRendered: (rendered: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  popupOpen: null,
  todoFormOpen: false,
  popupTranslateY: 0,
  isClosing: false,
  hasRendered: false,
  setPopupOpen: (section) => set({ popupOpen: section }),
  setTodoFormOpen: (open) => set({ todoFormOpen: open }),
  setPopupTranslateY: (y) => set({ popupTranslateY: y }),
  setIsClosing: (closing) => set({ isClosing: closing }),
  setHasRendered: (rendered) => set({ hasRendered: rendered }),
}));

export function toggleTodoForm(show: boolean) {
  const { setTodoFormOpen } = useSidebarStore.getState();
  setTodoFormOpen(show);
}
