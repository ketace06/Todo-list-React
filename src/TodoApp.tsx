import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import TodoList from "./components/TodoList";
import DayNightToggle from "./components/DayNightToogle";
import { useTodos } from "./components/CustomHook";
import type { Todo } from "./components/Types";

const TodoApp = () => {
	const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(
		window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
	);
	const { todos, handleAddTodo, handleDeleteTodo, handleEditTodo } = useTodos();

	useEffect(() => {
		document.body.classList.toggle("dark-mode", isDarkMode);
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

	return (
		<div className="todo-app">
			<DayNightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
			<TodoForm
				onAddTodo={handleAddTodo}
				todoToEdit={todoToEdit}
				onEditTodo={async (updatedTodo) => {
					await handleEditTodo(updatedTodo.id, updatedTodo);
				}}
				todos={todos}
				onDeleteTodo={handleDeleteTodo}
			/>

			<div className="todo-list-section">
				<TodoSection onAddTaskClick={() => setTodoToEdit(null)} />
				<TodoList
					todos={todos}
					onDeleteTodo={handleDeleteTodo}
					onEditTodo={async (todo) => {
						setTodoToEdit(todo);
					}}
				/>
			</div>
		</div>
	);
};

export default TodoApp;
