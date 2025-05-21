import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Props, Todo } from "./Types";
import { toggleTodoForm } from "./TodoFormState";

type TodoFormProps = Props & {
	todoToEdit?: Todo | null;
};

const TodoForm = ({ onAddTodo, todoToEdit, onEditTodo }: TodoFormProps) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (todoToEdit) {
			setTitle(todoToEdit.title || "");
			setDate(todoToEdit.due_date || "");
			setContent(todoToEdit.content || "");
		} else {
			setTitle("");
			setDate("");
			setContent("");
		}
	}, [todoToEdit]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		if (todoToEdit) {
			await onEditTodo({
				id: todoToEdit.id,
				title: title.trim(),
				due_date: date || undefined,
				content: content || undefined,
			});
		} else {
			await onAddTodo({
				title: title.trim(),
				due_date: date || undefined,
				content: content || undefined,
			});
		}

		setTitle("");
		setDate("");
		setContent("");
		toggleTodoForm(false);
	};

	return (
		<form className="todo-form-popup" onSubmit={handleSubmit}>
			<div className="title-formclose-btn">
				<h1>{todoToEdit ? "Modify Task" : "Create Task"}</h1>
				<button
					type="button"
					className="close-btn"
					onClick={() => toggleTodoForm(false)}
				>
					❌
				</button>
			</div>
			<div className="form">
				<p className="p-form">Title*</p>
				<input
					className="input-text"
					type="text"
					name="title"
					placeholder="What will you do?"
					autoComplete="off"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div className="form">
				<p className="p-form">Date</p>
				<input
					className="input-text"
					type="date"
					name="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</div>

			<div className="form">
				<p className="p-form">Description</p>
				<textarea
					className="p-description"
					name="content"
					placeholder="Add a description"
					autoComplete="off"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			<button className="simple-button" type="submit">
				{todoToEdit ? "Modify" : "Create"}
			</button>
		</form>
	);
};

export default TodoForm;
