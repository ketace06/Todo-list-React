import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Category, Props, Todo } from "./Types";
import { toggleTodoForm } from "./TodoFormState";
import { errorsManagment } from "./ErrorsManagment";

type TodoFormProps = Props & {
  todoToEdit?: Todo | null;
  categories: Category[];
};

const TodoForm = ({
  onAddTodo,
  todoToEdit,
  onEditTodo,
  categories,
}: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title || "");
      setDate(todoToEdit.due_date || "");
      setContent(todoToEdit.content || "");
      setCategory(todoToEdit.category ? String(todoToEdit.category) : "");
    } else {
      setTitle("");
      setDate("");
      setContent("");
      setCategory("");
    }
  }, [todoToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const errorMsg = errorsManagment(title, date, content);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    if (todoToEdit) {
      onEditTodo({
        id: todoToEdit.id,
        title: title.trim(),
        due_date: date || null,
        content: content || null,
        category_id: category || undefined,
      });
    } else {
      await onAddTodo({
        title: title.trim(),
        due_date: date || null,
        content: content || null,
        category_id: category || undefined,
      });
    }

    setTitle("");
    setDate("");
    setContent("");
    setCategory("");
    toggleTodoForm(false);
  };

  return (
    <>
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
          <p className="p-form">Category</p>
          <select
            className="input-text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form">
          <p className="p-form">Date</p>
          <input className="input-text" type="date" name="date" value={date} />
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
      {error && <div className="error-text">{error}</div>}
    </>
  );
};

export default TodoForm;
