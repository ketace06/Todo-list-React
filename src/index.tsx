import React from "react";
import ReactDOM from "react-dom/client";
import TodoApp from "./TodoApp";
import "./components/assets/App.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <TodoApp />
    </React.StrictMode>,
  );
}
