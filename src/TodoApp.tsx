import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import TodoList from "./components/TodoList";
import DayNightToggle from "./components/DayNightToogle";
import { useTodos } from "./components/CustomHook";

const TodoApp = () => {
	const [isDarkMode, setIsDarkMode] = useState(
		window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
	);
	const { todos, handleAddTodo, handleDeleteTodo } = useTodos();

	useEffect(() => {
		document.body.classList.toggle("dark-mode", isDarkMode);
	}, [isDarkMode]);

	const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

	return (
		<div className="todo-app">
			<DayNightToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
			<TodoForm
				todos={todos}
				onAddTodo={handleAddTodo}
				onDeleteTodo={handleDeleteTodo}
			/>
			<div className="todo-list-section">
				<TodoSection />
				<TodoList
					todos={todos}
					onAddTodo={handleAddTodo}
					onDeleteTodo={handleDeleteTodo}
				/>
			</div>
		</div>
	);
};

export default TodoApp;
