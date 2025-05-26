import { useEffect, useState } from "react";
import DayNightToggle from "./DayNightToggle";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return stored === "true";
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <span>for now there only one settings</span>
      <DayNightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default SettingsPage;
