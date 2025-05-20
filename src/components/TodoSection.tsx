export const TodoSection = () => {
	return (
		<div className="add-filter">
			<button
				className="simple-button"
				type="button"
				onClick={() => {
					const form = document.querySelector(
						".todo-form-popup",
					) as HTMLElement;
					if (form) {
						if (form.style.display === "flex") {
							form.style.transition = "opacity 0.3s";
							form.style.opacity = "0";
							setTimeout(() => {
								form.style.display = "none";
							}, 300);
						} else {
							form.style.display = "flex";
							form.style.opacity = "0";
							form.style.transition = "opacity 0.3s";
							setTimeout(() => {
								form.style.opacity = "1";
							}, 10);
						}
					}
				}}
			>
				Add a Task
			</button>
			<select className="select-filter">
				<option value="All">All</option>
				<option value="By date">Date</option>
				<option value="etc">Priority</option>
				<option value="etc">Categories</option>
				<option value="etc">Status</option>
			</select>
		</div>
	);
};

export default TodoSection;
