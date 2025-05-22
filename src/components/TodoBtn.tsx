import { toggleTodoForm } from "./TodoFormState";

export const TodoBtn = ({ onAddTaskClick }: { onAddTaskClick: () => void }) => {
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
      <select className="select-filter">
        <option value="All">All</option>
        <option value="By date">Date</option>
        <option value="etc">Priority</option>
        <option value="etc">Categories</option>
        <option value="etc">Status</option>
      </select>
    </>
  );
};

export default TodoBtn;
