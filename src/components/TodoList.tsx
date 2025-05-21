import type { Props } from "../components/Types";
import { toggleTodoForm } from "./TodoFormState";

const TodoList = ({
	todos,
	onDeleteTodo,
	onEditTodo,
}: Omit<Props, "onAddTodo">) => {
	const sortedTodos = todos.slice().reverse();

	return (
		<div>
			<ul className="todo-list">
				<h2>Recently added</h2>
				{sortedTodos.map((todo) => (
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
							<button
								className="Delete"
								type="button"
								onClick={() => onDeleteTodo(todo.id)}
							>
								🗑️
							</button>
							<button
								className="Edit"
								type="button"
								onClick={() => {
									toggleTodoForm(true);
									onEditTodo(todo);
								}}
							>
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
