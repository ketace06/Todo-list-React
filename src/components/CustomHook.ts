import { useState, useEffect, useCallback } from "react";
import { fetchApi, addTodo, deleteTodo, editTodo} from "../api/Api";
import type { NewTodo, Todo } from "../components/Types";

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const loadTodos = useCallback(async () => {
		setTodos(await fetchApi());
	}, []);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

    const handleAddTodo = async (newTodo: NewTodo) => {
        await addTodo(newTodo);
        loadTodos();
    };

	const handleDeleteTodo = async (id: number) => {
		await deleteTodo(id.toString());
		loadTodos();
	};
	const handleEditTodo = async (id: number, updatedTodo: NewTodo) => {
		const { title, due_date, content, done } = updatedTodo;
		await editTodo({ title, due_date, content, done }, id);
		loadTodos();
	};
	return { todos, handleAddTodo, handleDeleteTodo, handleEditTodo};
};
