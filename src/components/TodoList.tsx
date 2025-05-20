export const TodoList = () => {
	return (
		<ul className="todo-list">
			<h2>Recently added</h2>
			<li className="task-item">
				<input className="checkboxes" type="checkbox" />
				<div className="task-info">
					<span className="task-title">Task 1</span>
					<span className="due-date">Due: 2025-05-19</span>
				</div>
				<div className="delete-edit-button">
					<button className="Delete" type="button">
						🗑️
					</button>
					<button className="Edit" type="button">
						✏️
					</button>
				</div>
			</li>
			<li className="task-item">
				<input className="checkboxes" type="checkbox" />
				<div className="task-info">
					<span className="task-title">
						<s>Task done</s>
					</span>
					<span className="due-date">Due: 2025-05-19</span>
				</div>
				<div className="delete-edit-button">
					<button className="Delete" type="button">
						🗑️
					</button>
					<button className="Edit" type="button">
						✏️
					</button>
				</div>
			</li>
		</ul>
	);
};

export default TodoList;
