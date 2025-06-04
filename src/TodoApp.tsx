import { useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import CategoriesPage from "./components/CategoriesPage";
import SettingsPage from "./components/SettingsPage";
import { Toaster } from "sonner";
import { notifyOffline, notifyOnline } from "./components/UserNotifications";

const TodoApp = () => {
  const lastStatusRef = useRef<boolean | null>(null);

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;

      if (lastStatusRef.current === isOnline) return;
      lastStatusRef.current = isOnline;

      if (isOnline) {
        notifyOnline();
      } else {
        notifyOffline();
      }
    };

    updateNetworkStatus();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <Router>
      <div className="todo-app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </div>
    </Router>
  );
};

export default TodoApp;
