import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Todo, Category, Props } from "./Types";
import { errorsManagment } from "./ErrorsManagment";
import { fetchCategories, changeTodoCategory } from "../api/Api";
import { toggleTodoForm } from "./TodoFormState";
import Loader from "./Loader";

type TodoFormProps = Props & {
  todoToEdit?: Todo | null;
  categories: Category[];
};

const TodoForm = ({ onAddTodo, onEditTodo, todoToEdit }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const fetched = await fetchCategories();
        setCategories(fetched);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title || "");
      setDate(todoToEdit.due_date || "");
      setContent(todoToEdit.content || "");
      setCategory(todoToEdit.category ? todoToEdit.category.id : "");
    } else {
      setTitle("");
      setDate("");
      setContent("");
      setCategory("");
    }
  }, [todoToEdit]);

  useEffect(() => {
    if (!todoToEdit) {
      setHasChanged(false);
      return;
    }

    const originalTitle = todoToEdit.title || "";
    const originalDate = todoToEdit.due_date || "";
    const originalContent = todoToEdit.content || "";
    const originalCategory = todoToEdit.category ? todoToEdit.category.id : "";

    const isSame =
      title === originalTitle &&
      date === originalDate &&
      content === originalContent &&
      category === originalCategory;

    setHasChanged(!isSame);
  }, [title, date, content, category, todoToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const errorMsg = errorsManagment(title, date, content);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setLoadingSubmit(true);
    try {
      if (todoToEdit) {
        await onEditTodo(
          {
            id: todoToEdit.id,
            title: title.trim(),
            due_date: date || null,
            content: content || null,
            done: todoToEdit.done,
          },
          category === "" ? null : category,
        );
      } else {
        const newTodo = await onAddTodo({
          title: title.trim(),
          due_date: date || undefined,
          content: content || undefined,
        });
        if (newTodo?.id && category) {
          await changeTodoCategory(String(newTodo.id), category, false);
        }
        setTitle("");
        setDate("");
        setContent("");
        setCategory("");
      }
      setLoadingSubmit(false);
      toggleTodoForm(false);
    } catch {
      setLoadingSubmit(false);
    }
  };
  return (
    <>
      {loadingCategories || loadingSubmit ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <form className="todo-form-popup" onSubmit={handleSubmit}>
          <div className="title-formclose-btn">
            <h1>{todoToEdit ? "Modify Task" : "Create Task"}</h1>
            <button
              type="button"
              className="close-btn"
              onClick={() => {
                toggleTodoForm(false);
                setError(null);
              }}
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
          <button
            className="simple-button"
            type="submit"
            disabled={loadingSubmit || Boolean(todoToEdit && !hasChanged)}
          >
            {todoToEdit && !hasChanged
              ? "No changes to save"
              : todoToEdit
                ? "Modify"
                : "Create"}
          </button>
        </form>
      )}
      {error && <div className="error-text">{error}</div>}
    </>
  );
};

export default TodoForm;
