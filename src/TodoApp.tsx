import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import CategoriesPage from "./components/CategoriesPage";
import SettingsPage from "./components/SettingsPage";

const TodoApp = () => {
  return (
    <Router>
      <div className="todo-app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default TodoApp;
