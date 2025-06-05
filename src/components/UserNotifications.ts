import { toast } from "sonner";
import errorSound from "./assets/Sounds/Error.mp3";
import notifSound from "./assets/Sounds/Notif.mp3";
import successSound from "./assets/Sounds/Success.mp3";
import { useSettingsStore } from "../stores/settingsStore";

const SOUND_SUCCESS = successSound;
const SOUND_ERROR = errorSound;
const SOUND_INFO = notifSound;

const playSound = (soundUrl: string) => {
  const soundEnabled = useSettingsStore.getState().soundEnabled;
  if (!soundEnabled) return;
  try {
    const audio = new Audio(soundUrl);
    audio.play().catch(() => {});
  } catch (error) {
    console.warn("Error playing sound", error);
  }
};

export const notifyError = (message: string) => {
  const { soundEnabled, popupEnabled } = useSettingsStore.getState();
  if (soundEnabled) playSound(SOUND_ERROR);
  if (popupEnabled) toast.error(message);
};

export const notifySuccess = (message: string) => {
  const { soundEnabled, popupEnabled } = useSettingsStore.getState();
  if (soundEnabled) playSound(SOUND_SUCCESS);
  if (popupEnabled) toast.success(message);
};

export const notifyInfo = (message: string) => {
  const { soundEnabled, popupEnabled } = useSettingsStore.getState();
  if (soundEnabled) playSound(SOUND_INFO);
  if (popupEnabled) toast.info(message);
};

export const notifyOffline = () => notifyError("You are offline.");
export const notifyOnline = () => notifyInfo("Welcome back User");

export function errorsManagment(
  title: string,
  date: string,
  content: string,
): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!navigator.onLine) return "Warning: You are currently offline.";

  if (date) {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) return "Warning: Due date cannot be before today.";
  }

  if (title.trim().length === 0) return "Warning: Title is required.";
  if (title.trim().length > 50)
    return "Warning: Title must be less than 50 characters.";
  if (content.trim().length > 200)
    return "Warning: Description must be less than 200 characters.";

  return null;
}

export const validateAndNotify = (
  title: string,
  date: string,
  content: string,
): boolean => {
  const error = errorsManagment(title, date, content);
  if (error) {
    notifyError(error);
    return false;
  }
  return true;
};
