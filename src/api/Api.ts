import type {
  NewTodo,
  Todo,
  Category,
  CategoryInsert,
} from "../components/Types";

const API_URL = "https://api.todos.in.jt-lab.ch/todos";
const API_URL_CATEGORY = "https://api.todos.in.jt-lab.ch/categories";
const API_URL_TODO_CATEGORY = "https://api.todos.in.jt-lab.ch/categories_todos";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function handleApiError(response: Response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
}

export async function fetchApi(): Promise<Todo[]> {
  const res = await fetch(
    `${API_URL}?select=*,categories_todos!left(category:categories(*))`,
    { method: "GET", headers },
  );
  handleApiError(res);

  const rawTodos: (Todo & { categories_todos?: { category: Category }[] })[] =
    await res.json();

  return rawTodos.map(({ id, title, due_date, content, done }) => ({
    id,
    title,
    due_date,
    content,
    done,
  }));
}

export async function addTodo(todo: NewTodo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(todo),
  });
  handleApiError(res);
}

export async function deleteTodo(id: number | string) {
  const res = await fetch(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  handleApiError(res);
}

export async function editTodo(updatedTodo: NewTodo, id: number) {
  try {
    await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(updatedTodo),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoStatus(
  done: boolean,
  id: number | string,
  category_id?: string,
) {
  const res = await fetch(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ done }),
  });
  handleApiError(res);

  if (category_id !== undefined) {
    await changeTodoCategory(String(id), category_id);
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(API_URL_CATEGORY, {
    method: "GET",
    headers,
  });
  handleApiError(res);
  return res.json();
}

export async function addCategory(newCategory: CategoryInsert) {
  const res = await fetch(API_URL_CATEGORY, {
    method: "POST",
    headers,
    body: JSON.stringify(newCategory),
  });
  handleApiError(res);
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_URL_CATEGORY}?id=eq.${id}`, {
    method: "DELETE",
    headers,
  });
  handleApiError(res);
}

export async function updateCategory(
  id: string,
  updatedCategory: CategoryInsert,
) {
  const res = await fetch(`${API_URL_CATEGORY}?id=eq.${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updatedCategory),
  });
  handleApiError(res);
}

export async function changeTodoCategory(todoId: string, newCatId: string) {
  const res = await fetch(`${API_URL_TODO_CATEGORY}?todo_id=eq.${todoId}`, {
    headers,
  });
  handleApiError(res);

  const [link] = await res.json();
  const oldCatId = link?.category_id;

  if (oldCatId && oldCatId !== newCatId) {
    const delRes = await fetch(
      `${API_URL_TODO_CATEGORY}?todo_id=eq.${todoId}&category_id=eq.${oldCatId}`,
      { method: "DELETE", headers },
    );
    handleApiError(delRes);
  }

  if (newCatId && newCatId !== oldCatId) {
    const postRes = await fetch(API_URL_TODO_CATEGORY, {
      method: "POST",
      headers,
      body: JSON.stringify({
        todo_id: todoId,
        category_id: newCatId,
      }),
    });
    handleApiError(postRes);
  }
}
