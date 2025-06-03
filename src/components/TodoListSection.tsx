import { useState } from "react";
import type { Props } from "./Types";
import { toggleTodoForm } from "./TodoFormState";
import Loader from "./Loader";
import { notifyError, notifyInfo } from "./UserNotifications";

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

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await onDeleteTodo(id);
      notifyInfo("🗑️ The task has been successfully deleted!");
    } catch (err) {
      notifyError("❌ Error while deleting task. Check your internet.");
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleDone = async (id: number, done: boolean) => {
    setTogglingId(id);
    try {
      await onToggleDone(id, done);
      notifyInfo(`Task marked as ${done ? "done!" : "not done"}`);
    } catch (err) {
      notifyError("⚠️ Error while updating task status.");
      console.log(err);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <>
      {todos.length === 0 ? (
        <span className="sort-title">No todos to display!</span>
      ) : (
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
                    onChange={(e) =>
                      handleToggleDone(todo.id, e.target.checked)
                    }
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
                      onClick={() => handleDelete(todo.id)}
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
      )}
    </>
  );
};

export { TodoListSection, type SortOptions };
