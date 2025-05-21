import type { NewTodo, Todo } from "../components/Types"

const API_URL = 'https://api.todos.in.jt-lab.ch/todos'

function handleApiError(response: Response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }
}

const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

export async function fetchApi() : Promise<Todo[]> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers,
  })
  handleApiError(res)
  return res.json()
}

export async function addTodo(todo: NewTodo){
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(todo),
  })
  handleApiError(res)
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
