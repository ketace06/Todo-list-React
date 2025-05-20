import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
	onAddTodo: (todo: {
		title: string;
		due_date?: string;
		content?: string;
	}) => Promise<void>;
};

const TodoForm = ({ onAddTodo }: Props) => {
	const [formData, setFormData] = useState({
		title: "",
		category: "",
		date: "",
		content: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.title.trim()) return;

		await onAddTodo({
			title: formData.title.trim(),
			due_date: formData.date || undefined,
			content: formData.content || undefined,
		});

		setFormData({ title: "", category: "", date: "", content: "" });
	};
	return (
		<form className="todo-form-popup" onSubmit={handleSubmit}>
			<h1>Create Task</h1>

			<div className="form">
				<p className="p-form">Title*</p>
				<input
					className="input-text"
					type="text"
					name="title"
					placeholder="What will you do?"
					autoComplete="off"
					value={formData.title}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="form">
				<p className="p-form">Category</p>
				<input
					className="input-text"
					type="text"
					name="category"
					placeholder="Choose a category"
					autoComplete="off"
					value={formData.category}
					onChange={handleChange}
				/>
			</div>

			<div className="form">
				<p className="p-form">Date</p>
				<input
					className="input-text"
					type="date"
					name="date"
					value={formData.date}
					onChange={handleChange}
				/>
			</div>

			<div className="form">
				<p className="p-form">Description</p>
				<textarea
					className="p-description"
					name="content"
					placeholder="Add a description"
					autoComplete="off"
					value={formData.content}
					onChange={handleChange}
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
