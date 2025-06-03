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

function handleApiError(res: Response) {
  if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(
    `${API_URL}?select=*,categories_todos!left(category:categories(*))`,
    { headers: { ...headers, Prefer: "return=representation" } },
  );
  handleApiError(res);
  const rawTodos: (Todo & { categories_todos?: { category: Category }[] })[] =
    await res.json();
  return rawTodos.map(
    ({ id, title, due_date, content, done, categories_todos }) => ({
      id,
      title,
      due_date,
      content,
      done,
      category: categories_todos?.[0]?.category ?? null,
    }),
  );
}

export async function addTodo(
  todo: NewTodo,
  categoryId?: string | null,
): Promise<Todo> {
  if (!todo.title) {
    throw new Error("Title is required");
  }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(todo),
  });
  handleApiError(res);
  const [createdTodo] = await res.json();
  if (categoryId) {
    const linkRes = await fetch(API_URL_TODO_CATEGORY, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        todo_id: createdTodo.id,
        category_id: categoryId,
      }),
    });
    handleApiError(linkRes);
  }
  return createdTodo;
}

export async function deleteTodo(id: number | string): Promise<void> {
  const res = await fetch(`${API_URL}?id=eq.${id}`, {
    method: "DELETE",
    headers: { ...headers, Prefer: "return=representation" },
  });
  handleApiError(res);
}

export async function editTodo(
  updatedTodo: NewTodo,
  id: number,
  categoryId?: string | null,
): Promise<void> {
  const done = updatedTodo.done ?? false;

  await fetch(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(updatedTodo),
  }).then(handleApiError);

  await changeTodoCategory(String(id), categoryId ?? null, done);
}

export async function updateTodoStatus(
  done: boolean,
  id: number | string,
  categoryId?: string | null,
): Promise<void> {
  const res = await fetch(`${API_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({ done }),
  });
  handleApiError(res);
  if (categoryId) {
    await changeTodoCategory(String(id), categoryId, done);
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(API_URL_CATEGORY, { headers });
  handleApiError(res);
  return res.json();
}

export async function addCategory(newCategory: CategoryInsert): Promise<void> {
  const res = await fetch(API_URL_CATEGORY, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(newCategory),
  });
  handleApiError(res);
}
export async function deleteCategory(id: string): Promise<void> {
  const deleteLinksRes = await fetch(
    `${API_URL_TODO_CATEGORY}?category_id=eq.${id}`,
    {
      method: "DELETE",
      headers: { ...headers, Prefer: "return=representation" },
    },
  );
  handleApiError(deleteLinksRes);

  const deleteCategoryRes = await fetch(`${API_URL_CATEGORY}?id=eq.${id}`, {
    method: "DELETE",
    headers: { ...headers, Prefer: "return=representation" },
  });
  handleApiError(deleteCategoryRes);
}

export async function clearAllCategories() {
  try {
    const response = await fetch(API_URL_CATEGORY, {
      method: "DELETE",
      headers: { ...headers, Prefer: "return=representation" },
    });

    await handleApiError(response);
    fetchCategories();
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "An unknown error occurred.",
    );
  }
}

export async function updateCategory(
  id: string,
  updatedCategory: CategoryInsert,
): Promise<void> {
  const res = await fetch(`${API_URL_CATEGORY}?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify(updatedCategory),
  });
  handleApiError(res);
}

export async function changeTodoCategory(
  todoId: string,
  newCatId: string | null | undefined,
  done: boolean,
) {
  const res = await fetch(`${API_URL_TODO_CATEGORY}?todo_id=eq.${todoId}`, {
    headers: { ...headers, Prefer: "return=representation" },
  });
  const links = await res.json();
  const oldCatId = links?.[0]?.category_id;

  if (oldCatId && oldCatId !== newCatId) {
    await fetch(
      `${API_URL_TODO_CATEGORY}?todo_id=eq.${todoId}&category_id=eq.${oldCatId}`,
      { method: "DELETE" },
    );
  }

  if (newCatId && newCatId !== "") {
    const linkRes = await fetch(API_URL_TODO_CATEGORY, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify({
        todo_id: todoId,
        category_id: newCatId,
      }),
    });
    handleApiError(linkRes);
  }

  await fetch(`${API_URL}?id=eq.${todoId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({ done }),
  });
}
