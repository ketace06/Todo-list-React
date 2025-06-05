import { create } from "zustand";
import {
  setNotificationsEnabled,
  setPopupEnabled,
} from "../components/UserNotifications";

type SettingsState = {
  isDarkMode: boolean;
  soundEnabled: boolean;
  popupEnabled: boolean;

  toggleDarkMode: () => void;
  toggleSound: () => void;
  togglePopup: () => void;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  isDarkMode: (() => {
    const stored = localStorage.getItem("darkMode");
    return stored
      ? stored === "true"
      : (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  })(),

  soundEnabled: localStorage.getItem("notificationsEnabled") !== "false",
  popupEnabled: localStorage.getItem("popupEnabled") !== "false",

  toggleDarkMode: () => {
    const newValue = !get().isDarkMode;
    localStorage.setItem("darkMode", newValue.toString());
    document.body.classList.toggle("dark-mode", newValue);
    set({ isDarkMode: newValue });
  },

  toggleSound: () => {
    const newValue = !get().soundEnabled;
    localStorage.setItem("notificationsEnabled", newValue.toString());
    setNotificationsEnabled(newValue);
    set({ soundEnabled: newValue });
  },

  togglePopup: () => {
    const newValue = !get().popupEnabled;
    localStorage.setItem("popupEnabled", newValue.toString());
    setPopupEnabled(newValue);
    set({ popupEnabled: newValue });
  },
}));
