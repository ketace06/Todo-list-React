import TodoForm from "./components/Form";
import TodoSection from "./components/TodoSection";
import TodoFooter from "./components/Footer";
import TodoList from "./components/TodoList";

const TodoApp = () => {
	return (
		<div className="todo-app">
			<TodoForm />
			<div className="todo-list-section">
				<TodoSection />
				<TodoList />
			</div>
			<TodoFooter />
			<h1 className="title">TODO LIST</h1>
			<p className="ErrorText">Error: don't do that!</p>
		</div>
	);
};

export default TodoApp;
