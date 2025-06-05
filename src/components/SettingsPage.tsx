import { useSettingsStore } from "../stores/settingsStore";
import DayNightToggle from "./DayNightToggle";

const SettingsPage = () => {
  const { soundEnabled, popupEnabled, toggleSound, togglePopup } =
    useSettingsStore();

  return (
    <div className="settings-page">
      <div className="settings-li">
        <span>Toggle day/night theme</span>
        <DayNightToggle />
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
