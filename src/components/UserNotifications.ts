import { toast } from "sonner";

const SOUND_SUCCESS = "/sounds/success.mp3";
const SOUND_ERROR = "/sounds/error.mp3";
const SOUND_INFO = "/sounds/info.mp3";

let notificationsEnabled = true;

export const setNotificationsEnabled = (enabled: boolean) => {
  notificationsEnabled = enabled;
};

const playSound = (soundUrl: string) => {
  if (!notificationsEnabled) return;
  try {
    const audio = new Audio(soundUrl);
    audio.play().catch(() => {});
  } catch (error) {
    console.warn("Error playing sound", error);
  }
};

export function errorsManagment(
  title: string,
  date: string,
  content: string,
): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!navigator.onLine) {
    return "Warning: You are currently offline.";
  }

  if (date) {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      return "Warning: Due date cannot be before today.";
    }
  }

  if (title.trim().length === 0) {
    return "Warning: Title is required.";
  }

  if (title.trim().length > 50) {
    return "Warning: Title must be less than 50 characters.";
  }

  if (content.trim().length > 200) {
    return "Warning: Description must be less than 200 characters.";
  }

  return null;
}

export const validateAndNotify = (
  title: string,
  date: string,
  content: string,
): boolean => {
  const error = errorsManagment(title, date, content);

  if (error) {
    if (notificationsEnabled) {
      playSound(SOUND_ERROR);
      toast.error(error);
    }
    return false;
  }

  return true;
};

export const notifyError = (message: string) => {
  if (!notificationsEnabled) return;
  playSound(SOUND_ERROR);
  toast.error(message);
};

export const notifySuccess = (message: string) => {
  if (!notificationsEnabled) return;
  playSound(SOUND_SUCCESS);
  toast.success(message);
};

export const notifyInfo = (message: string) => {
  if (!notificationsEnabled) return;
  playSound(SOUND_INFO);
  toast(message);
};

export const notifyTaskDeleted = () =>
  notifySuccess("🗑️ Task successfully deleted!");
export const notifyTaskUpdated = () => notifySuccess("✅ Task updated!");
export const notifyOffline = () => notifyError("⚠️ You are offline.");
