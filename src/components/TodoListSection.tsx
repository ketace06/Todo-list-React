import type { Props } from "./Types";
import Loader from "./Loader";
import { notifyError, notifyInfo, notifySuccess } from "./UserNotifications";
import { useTodoFormUIStore, useTodoListStore } from "../stores/todoFormStore";
import { useShallow } from "zustand/react/shallow";

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
  const { deletingId, togglingId, setDeletingId, setTogglingId } =
    useTodoListStore(
      useShallow((state) => ({
        deletingId: state.deletingId,
        togglingId: state.togglingId,
        setDeletingId: state.setDeletingId,
        setTogglingId: state.setTogglingId,
      })),
    );
  const { setOpen } = useTodoFormUIStore();

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
      notifySuccess("The task has been successfully deleted!");
    } catch (err) {
      notifyError("Error deleting task.");
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
      notifyError("Error updating task status.");
      console.log(err);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <>
      {todos.length === 0 ? (
        <ul className="todo-list">
          <span className="sort-title">No todos to display!</span>
        </ul>
      ) : (
        <ul className="todo-list">
          <span className="sort-title">
            {sortBy === "recent"
              ? "Recently created"
              : sortBy === "date"
                ? dueDateTitle
                : sortBy === "alphabetical"
                  ? "Sort by alphabetical"
                  : sortBy === "status"
                    ? statusTitle
                    : ""}
          </span>
          {sortedTodos.map((todo) => {
            const categoryColor = todo.category?.color || null;
            return (
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
                      <span className="task-alphabetical">
                        {todo.title}
                        {categoryColor && (
                          <span
                            style={{
                              display: "inline-block",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: categoryColor,
                              marginRight: "6px",
                              border: "1px solid black",
                            }}
                            aria-label={`Category color for ${todo.category?.title}`}
                          />
                        )}
                      </span>
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
                          setOpen(true);
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
            );
          })}
        </ul>
      )}
    </>
  );
};

export { TodoListSection, type SortOptions };
