import { useEffect } from "react";
import type { FormEvent } from "react";
import type { Todo, Category, Props } from "./Types";
import { fetchCategories, changeTodoCategory } from "./assets/api/Api";
import Loader from "./Loader";
import { validateAndNotify, notifySuccess } from "./UserNotifications";
import { useTodoFormStore, useTodoFormUIStore } from "../stores/todoFormStore";
import { useShallow } from "zustand/react/shallow";

type TodoFormProps = Props & {
  todoToEdit?: Todo | null;
  categories: Category[];
};

const TodoForm = ({ onAddTodo, onEditTodo, todoToEdit }: TodoFormProps) => {
  const {
    title,
    date,
    content,
    category,
    categories,
    loadingCategories,
    loadingSubmit,
    hasChanged,
    setTitle,
    setDate,
    setContent,
    setCategory,
    setCategories,
    setLoadingCategories,
    setLoadingSubmit,
    setHasChanged,
    setTodoToEdit,
    resetForm,
  } = useTodoFormStore(
    useShallow((state) => ({
      title: state.title,
      date: state.date,
      content: state.content,
      category: state.category,
      categories: state.categories,
      loadingCategories: state.loadingCategories,
      loadingSubmit: state.loadingSubmit,
      hasChanged: state.hasChanged,
      setTitle: state.setTitle,
      setDate: state.setDate,
      setContent: state.setContent,
      setCategory: state.setCategory,
      setCategories: state.setCategories,
      setLoadingCategories: state.setLoadingCategories,
      setLoadingSubmit: state.setLoadingSubmit,
      setHasChanged: state.setHasChanged,
      setTodoToEdit: state.setTodoToEdit,
      resetForm: state.resetForm,
    })),
  );

  const { isOpen, isClosing, setOpen } = useTodoFormUIStore();

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
  }, [setCategories, setLoadingCategories]);

  useEffect(() => {
    setTodoToEdit(todoToEdit ?? null);
    if (todoToEdit) {
      setOpen(true);
      setTitle(todoToEdit.title || "");
      setDate(todoToEdit.due_date || "");
      setContent(todoToEdit.content || "");
      setCategory(todoToEdit.category ? String(todoToEdit.category.id) : "");
    } else {
      resetForm();
    }
  }, [
    resetForm,
    setCategory,
    setContent,
    setDate,
    setTitle,
    setTodoToEdit,
    todoToEdit,
    setOpen,
  ]);

  useEffect(() => {
    if (!todoToEdit) {
      setHasChanged(false);
      return;
    }
    const originalTitle = todoToEdit.title || "";
    const originalDate = todoToEdit.due_date || "";
    const originalContent = todoToEdit.content || "";
    const originalCategory = todoToEdit.category
      ? String(todoToEdit.category.id)
      : "";
    const isSame =
      title === originalTitle &&
      date === originalDate &&
      content === originalContent &&
      category === originalCategory;
    setHasChanged(!isSame);
  }, [title, date, content, category, todoToEdit, setHasChanged]);

  if (!isOpen && !isClosing) return null;

  const closePopup = () => {
    setOpen(false);
    resetForm();
    setTodoToEdit(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateAndNotify(title, date, content)) return;

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
        notifySuccess("Task updated!");
      } else {
        const newTodo = await onAddTodo({
          title: title.trim(),
          due_date: date || undefined,
          content: content || undefined,
        });
        if (newTodo?.id && category) {
          await changeTodoCategory(String(newTodo.id), category);
        }
        notifySuccess("Task created!");
        resetForm();
      }
      setLoadingSubmit(false);
      closePopup();
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
        <div
          className={`form-backdrop ${isOpen ? "open" : ""} ${
            isClosing ? "closing" : ""
          }`}
          onClick={closePopup}
          style={{
            pointerEvents: isOpen || isClosing ? "auto" : "none",
          }}
        >
          <form
            className={`todo-form-popup ${isOpen ? "open" : ""} ${
              isClosing ? "closing" : ""
            }`}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-formclose-btn">
              <h1>{todoToEdit ? "Modify Task" : "Create Task"}</h1>
              <button type="button" className="close-btn" onClick={closePopup}>
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
                  <option key={cat.id} value={String(cat.id)}>
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
        </div>
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
        }}
      ></div>
    </>
  );
};

export default TodoForm;
