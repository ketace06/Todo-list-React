import { useEffect, useState } from "react";
import DayNightToggle from "./DayNightToggle";
import { setNotificationsEnabled, setPopupEnabled } from "./UserNotifications";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored
      ? stored === "true"
      : (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("notificationsEnabled") !== "false";
  });

  const [popupEnabled, setPopupEnabledState] = useState(() => {
    return localStorage.getItem("popupEnabled") !== "false";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    setNotificationsEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setPopupEnabled(popupEnabled);
  }, [popupEnabled]);

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <DayNightToggle
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      <div className="sound-toggle">
        <label>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled((prev) => !prev)}
          />
          Enable Notification Sounds
        </label>
      </div>

      <div className="popup-toggle">
        <label>
          <input
            type="checkbox"
            checked={popupEnabled}
            onChange={() => setPopupEnabledState((prev) => !prev)}
          />
          Enable Notification Popups
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
