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

					if (!form) return;

					const hideForm = () => {
						form.style.transition = "opacity 0.3s";
						form.style.opacity = "0";
						setTimeout(() => {
							form.style.display = "none";
							document.removeEventListener("mousedown", outsideClickListener);
						}, 300);
					};

					const outsideClickListener = (event: MouseEvent) => {
						if (!form.contains(event.target as Node)) {
							hideForm();
						}
					};

					if (form.style.display === "flex") {
						hideForm();
					} else {
						form.style.display = "flex";
						form.style.opacity = "0";
						form.style.transition = "opacity 0.3s";

						setTimeout(() => {
							const focusable = form.querySelector(
								"input, textarea, select, button",
							) as HTMLElement;
							if (focusable) focusable.focus();
							form.style.opacity = "1";
							document.addEventListener("mousedown", outsideClickListener);
						}, 10);
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
