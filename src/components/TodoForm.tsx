import { useState } from "react";
import type { FormEvent } from "react";
import type { Props } from "./Types";

const TodoForm = ({ onAddTodo }: Props) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		await onAddTodo({
			title: title.trim(),
			due_date: date || undefined,
			content: content || undefined,
		});

		setTitle("");
		setDate("");
		setContent("");
	};

	return (
		<form className="todo-form-popup" onSubmit={handleSubmit}>
			<div className="title-formclose-btn">
				<h1>Create Task</h1>
				<button type="button" className="close-btn">
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
				Create
			</button>

			<button className="simple-button clear-all" type="button">
				Clear all tasks
			</button>
		</form>
	);
};

export default TodoForm;
