import { toggleTodoForm } from "./TodoFormState";
import type { SortOptions } from "./TodoListSection";

export const TodoBtn = ({
  onAddTaskClick,
  sortBy,
  setSortBy,
}: {
  onAddTaskClick: () => void;
  sortBy: string;
  setSortBy: (value: SortOptions) => void;
}) => {
  const stringToSortOption = (data: string): SortOptions => {
    switch (data) {
      case "recent":
        return "recent";
      case "date":
        return "date";
      case "alphabetical":
        return "alphabetical";
      case "status":
        return "status";
      case "no-todos":
        return "no-todos";
      default:
        throw new Error(`This sort option is not supported : ${data}`);
    }
  };
  return (
    <>
      <div className="add-btn">
        <button
          className="simple-button"
          type="button"
          onClick={() => {
            onAddTaskClick();
            const form = document.querySelector(
              ".todo-form-popup",
            ) as HTMLElement;
            if (
              form &&
              form.style.display !== "flex" &&
              form.style.opacity !== "1"
            ) {
              toggleTodoForm(true);
            }
          }}
        >
          Add a Task
        </button>
      </div>
      <div className="add-btn-responsive">
        <button
          className="rounded-btn"
          type="button"
          onClick={() => {
            onAddTaskClick();
            const form = document.querySelector(
              ".todo-form-popup",
            ) as HTMLElement;
            if (
              form &&
              form.style.display !== "flex" &&
              form.style.opacity !== "1"
            ) {
              toggleTodoForm(true);
            }
          }}
        >
          +
        </button>
      </div>
      <select
        className="select-filter"
        value={sortBy}
        onChange={(e) => setSortBy(stringToSortOption(e.target.value))}
      >
        <option value="recent">Recent</option>
        <option value="date">Date</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="status">Status</option>
      </select>
    </>
  );
};

export default TodoBtn;
