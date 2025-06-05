import { useTodoFormUIStore } from "../stores/todoFormStore";
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
  const { setOpen } = useTodoFormUIStore();

  const handleClick = () => {
    onAddTaskClick();
    setOpen(true); 
  };

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
        throw new Error(`This sort option is not supported: ${data}`);
    }
  };

  return (
    <>
      <div className="add-btn">
        <button className="simple-button" type="button" onClick={handleClick}>
          Add a Task
        </button>
      </div>
      <div className="add-btn-responsive">
        <button className="rounded-btn" type="button" onClick={handleClick}>
          +
        </button>
      </div>
      <select
        id="select-filter"
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

export default TodoBtn