import type { Props } from "../components/Types";
import { toggleTodoForm } from "./TodoFormState";

type TodoListProps = Omit<Props, "onAddTodo"> & {
  onToggleDone: (id: number, done: boolean) => void;
};

const TodoListSection = ({
  todos,
  onDeleteTodo,
  onEditTodo,
  onToggleDone,
}: TodoListProps) => {
  const sortedTodos = todos.slice().reverse();

  return (
    <div>
      <ul className="todo-list">
        {sortedTodos.length === 0 ? (
          <>
            <h2>No todos yet</h2>
          </>
        ) : (
          <h2>Recently added</h2>
        )}
        {sortedTodos.map((todo) => (
          <li className="task-item" key={todo.id}>
            <input
              className="checkboxes"
              type="checkbox"
              checked={!!todo.done}
              onChange={(e) => onToggleDone(todo.id, e.target.checked)}
            />
            <div className="task-info">
              <span className="task-title">{todo.title}</span>
              <span className="due-date">Due: {todo.due_date || "N/A"}</span>
              <span className="description">
                Description: {todo.content || "None"}
              </span>
            </div>
            <div className="delete-edit-button">
              <button
                className="Delete"
                type="button"
                onClick={() => onDeleteTodo(todo.id)}
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
              >
                ✏️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListSection;
