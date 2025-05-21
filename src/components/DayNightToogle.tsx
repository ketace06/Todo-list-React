type Props = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};

const DayNightToggle = ({ isDarkMode, toggleDarkMode }: Props) => {
	return (
		<label className="switch">
			<input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
			<span className="slider round" />
		</label>
	);
};

export default DayNightToggle;
