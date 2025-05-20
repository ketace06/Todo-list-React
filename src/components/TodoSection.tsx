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
						if (form) form.classList.add("show");
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
