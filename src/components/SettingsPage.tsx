import { useSettingsStore } from "../stores/stores"
import DayNightToggle from "./DayNightToggle";

const SettingsPage = () => {
  const {
    isDarkMode,
    soundEnabled,
    popupEnabled,
    toggleDarkMode,
    toggleSound,
    togglePopup,
  } = useSettingsStore();

  return (
    <div className="settings-page">
      <div className="settings-li">
        <span>Settings</span>
        <DayNightToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>

      <div className="settings-li">
        <span>Enable Notification Sounds</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={toggleSound}
          />
          <span className="slider round" />
        </label>
      </div>

      <div className="settings-li">
        <span>Enable Notification Popups</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={popupEnabled}
            onChange={togglePopup}
          />
          <span className="slider round" />
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
