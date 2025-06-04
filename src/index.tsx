import { BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
function TodoApp() {
  return (
    <BrowserRouter basename="/Todo-list-React">
      <HomePage />
    </BrowserRouter>
  );
}

export default TodoApp;
