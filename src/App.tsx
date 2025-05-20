import "./assets/App.css";
import Form from "./components/Form";
import TodoSection from "./components/TodoSection";
import Footer from "./components/Footer";

const TodoApp = () => {
	return (
		<div className="todo-app">
			<h1 className="title">TODO LIST</h1>
			<TodoSection />
			<Form />
			<Footer />
			<p className="ErrorText">Error: don't do that!</p>
		</div>
	);
};

export default TodoApp;
