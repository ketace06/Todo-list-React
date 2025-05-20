type Todo = {
	id: number | string;
	title: string;
	due_date?: string;
	content?: string;
};

type Props = {
	todos: Todo[];
};

const TodoList = ({ todos }: Props) => {
	return (
		<div>
			<ul className="todo-list">
				<h2>Recently added</h2>
				{todos.map((todo) => (
					<li className="task-item" key={todo.id}>
						<input className="checkboxes" type="checkbox" />
						<div className="task-info">
							<span className="task-title">{todo.title}</span>
							<span className="due-date">Due: {todo.due_date || "N/A"}</span>
							<span className="description">
								Description: {todo.content || "None"}
							</span>
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
				))}
			</ul>
		</div>
	);
};

export default TodoList;
