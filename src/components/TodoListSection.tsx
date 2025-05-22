import type { Props } from "./Types";
import { toggleTodoForm } from "./TodoFormState";

export type SortOptions =
	| "recent"
	| "date"
	| "alphabetical"
	| "status"
	| "no-todos";

type TodoListProps = Omit<Props, "onAddTodo"> & {
	onToggleDone: (id: number, done: boolean) => void;
	sortBy: SortOptions;
};
const TodoListSection = ({
	todos,
	onDeleteTodo,
	onEditTodo,
	onToggleDone,
	sortBy,
}: TodoListProps) => {
	if (todos.length === 0 && sortBy !== "no-todos") {
		return (
			<div>
				<span className="sort-title">no todos added</span>
			</div>
		);
	}
	const sortedTodos = todos.slice().sort((a, b) => {
		if (sortBy === "recent") {
			return b.id - a.id;
		}
		if (sortBy === "date") {
			if (!a.due_date) return 1;
			if (!b.due_date) return -1;
			return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
		}
		if (sortBy === "alphabetical") {
			return a.title.localeCompare(b.title);
		}
		if (sortBy === "status") {
			return Number(!!b.done) - Number(!!a.done);
		}
		return 0;
	});

	return (
		<div>
			<ul className="todo-list">
				<span className="sort-title">
					{sortBy === "recent"
						? "Recently added"
						: sortBy === "date"
							? "Sort by due date"
							: sortBy === "alphabetical"
								? "Sort by alphabetical"
								: sortBy === "status"
									? "Sort by status"
									: sortBy === "no-todos"
										? "no todos added"
										: "no todos added"}
				</span>
				{sortedTodos.map((todo) => (
					<li className="task-item" key={todo.id}>
						<input
							className="checkboxes"
							type="checkbox"
							checked={!!todo.done}
							onChange={(e) => onToggleDone(todo.id, e.target.checked)}
						/>
						<div className="task-info">
							<span className="task-alphabetical">{todo.title}</span>
							{todo.due_date && (
								<span className="due-date">Due: {todo.due_date} </span>
							)}
							{todo.content && (
								<span className="description">
									Description: {todo.content || "None"}
								</span>
							)}
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

export default TodoListSection;
