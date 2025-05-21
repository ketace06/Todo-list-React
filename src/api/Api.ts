const API_URL = 'https://api.todos.in.jt-lab.ch/todos'

function handleApiError(response: Response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }
}

export async function fetchApi() {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  await handleApiError(res)
  return res.json()
}

export async function addTodo(todo: { title: string; due_date?: string; content?: string; }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
  await handleApiError(res)
}

export async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  
  await handleApiError(res)
}
