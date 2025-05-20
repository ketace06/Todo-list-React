export default function Form() {
	return (
		<form className="todo-form-popup">
			<h1>Create Task</h1>
			<div className="form">
				<p className="p-form">Title*</p>
				<input
					className="input-text"
					type="text"
					placeholder="What will you do?"
					autoComplete="off"
				/>
			</div>
			<div className="form">
				<p className="p-form">Category</p>
				<input
					className="input-text"
					type="text"
					placeholder="Choose a category"
					autoComplete="off"
				/>
			</div>
			<div className="form">
				<p className="p-form">Date</p>
				<input className="input-text" type="date" />
			</div>
			<div className="form">
				<p className="p-form">Description</p>
				<textarea
					className="p-description"
					placeholder="Add a description"
					autoComplete="off"
				/>
			</div>
			<button className="simple-button" type="submit">
				Create
			</button>
			<button className="simple-button clear-all" type="submit">
				Clear all tasks
			</button>
		</form>
	);
}
