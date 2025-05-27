import { useState } from "react";
import type { Props } from "./Types";
import { toggleTodoForm } from "./TodoFormState";
import Loader from "./Loader";

type SortOptions = "recent" | "date" | "alphabetical" | "status" | "no-todos";

type TodoListProps = Omit<Props, "onAddTodo"> & {
  onToggleDone: (id: number, done: boolean) => Promise<void>;
  sortBy: SortOptions;
};

const TodoListSection = ({
  todos,
  onDeleteTodo,
  onEditTodo,
  onToggleDone,
  sortBy,
}: TodoListProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  let filteredTodos = todos.slice();
  let statusTitle = "";
  let dueDateTitle = "";

  if (sortBy === "status") {
    filteredTodos = filteredTodos.filter((todo) => !todo.done);
    statusTitle =
      filteredTodos.length === 0 ? "You did it all!" : "Sort by status";
  }

  if (sortBy === "date") {
    filteredTodos = filteredTodos.filter((todo) => todo.due_date);
    dueDateTitle =
      filteredTodos.length === 0
        ? "You have no tasks assigned to a date!"
        : "Sort by date";
  }

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortBy === "recent" || sortBy === "status") {
      return b.id - a.id;
    }
    if (sortBy === "date") {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleDelete = async (id: number, done: boolean) => {
    setDeletingId(id);
    try {
      await onDeleteTodo(id);
      await onToggleDone(id, done);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleDone = async (id: number, done: boolean) => {
    setTogglingId(id);
    try {
      await onToggleDone(id, done);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <ul className="todo-list">
      <span className="sort-title">
        {sortBy === "recent"
          ? "Recently added"
          : sortBy === "date"
            ? dueDateTitle
            : sortBy === "alphabetical"
              ? "Sort by alphabetical"
              : sortBy === "status"
                ? statusTitle
                : ""}
      </span>
      {sortedTodos.map((todo) => (
        <li className="task-item" key={todo.id}>
          {deletingId === todo.id || togglingId === todo.id ? (
            <Loader />
          ) : (
            <>
              <input
                className="checkboxes"
                type="checkbox"
                checked={!!todo.done}
                onChange={(e) => handleToggleDone(todo.id, e.target.checked)}
                disabled={deletingId !== null || togglingId !== null}
              />
              <div className="task-info">
                <span className="task-alphabetical">{todo.title}</span>
                {todo.due_date && (
                  <span className="due-date">Due: {todo.due_date}</span>
                )}
                {todo.content && (
                  <span className="description">
                    Description: {todo.content || "None"}
                  </span>
                )}
              </div>
              <div className="delete-edit-button">
                <button
                  className="Delete"
                  type="button"
                  onClick={() => handleDelete(todo.id, !!todo.done)}
                  disabled={deletingId !== null || togglingId !== null}
                >
                  🗑️
                </button>
                <button
                  className="Edit"
                  type="button"
                  onClick={() => {
                    toggleTodoForm(true);
                    onEditTodo(todo);
                  }}
                  disabled={deletingId !== null || togglingId !== null}
                >
                  ✏️
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export { TodoListSection, type SortOptions };
