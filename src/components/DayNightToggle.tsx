import { useShallow } from "zustand/react/shallow";
import { useSettingsStore } from "../stores/settingsStore";

const DayNightToggle = () => {
  const { darkMode, toggleMode } = useSettingsStore(
    useShallow((state) => ({
      darkMode: state.isDarkMode,
      toggleMode: state.toggleDarkMode,
    })),
  );

  return (
    <label className="switch">
      <input type="checkbox" checked={darkMode} onChange={toggleMode} />
      <span className="slider round" />
    </label>
  );
};
export default DayNightToggle;
