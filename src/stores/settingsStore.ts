import { create } from "zustand";
import { notifyInfo } from "../components/UserNotifications";

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
    if (stored !== null) {
      const num = Number(stored);
      return num === 1;
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  })(),

  soundEnabled: (() => {
    const stored = localStorage.getItem("notificationsEnabled");
    if (stored !== null) {
      const num = Number(stored);
      return num === 1;
    }
    return true;
  })(),

  popupEnabled: (() => {
    const stored = localStorage.getItem("popupEnabled");
    if (stored !== null) {
      const num = Number(stored);
      return num === 1;
    }
    return true;
  })(),

  toggleDarkMode: () => {
    const newValue = !get().isDarkMode;
    localStorage.setItem("darkMode", newValue ? "1" : "0");
    document.body.classList.toggle("dark-mode", newValue);
    set({ isDarkMode: newValue });
    if (newValue !== undefined) {
      notifyInfo("The theme is " + (newValue ? "night" : "day"));
    }
  },

  toggleSound: () => {
    const newValue = !get().soundEnabled;
    localStorage.setItem("notificationsEnabled", newValue ? "1" : "0");
    set({ soundEnabled: newValue });
    if (newValue !== undefined) {
      notifyInfo("Sound is " + (newValue ? "on" : "off"));
    }
  },

  togglePopup: () => {
    const newValue = !get().popupEnabled;
    localStorage.setItem("popupEnabled", newValue ? "1" : "0");
    set({ popupEnabled: newValue });
    if (newValue !== undefined) {
      notifyInfo("Popup is displayed");
    }
  },
}));
