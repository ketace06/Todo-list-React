import { useState, useEffect, useCallback } from "react";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";
import TodoFooter from "./components/TodoFooter";
import TodoList from "./components/TodoList";
import { fetchApi, addTodo } from "./api/Api";

const TodoApp = () => {
	const [todos, setTodos] = useState([]);

	const loadTodos = useCallback(async () => {
		const data = await fetchApi();
		setTodos(data);
	}, []);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

	const handleAddTodo = async (newTodo: {
		title: string;
		due_date?: string;
		content?: string;
	}) => {
		await addTodo(newTodo);
		await loadTodos();
	};

	return (
		<div className="todo-app">
			<TodoForm onAddTodo={handleAddTodo} />
			<div className="todo-list-section">
				<TodoSection />
				<TodoList todos={todos} />
			</div>
			<TodoFooter />
			<h1 className="title">TODO LIST</h1>
			<p className="ErrorText">Error: don't do that!</p>
		</div>
	);
};

export default TodoApp;
