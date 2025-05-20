export default async function FetchApi() {
  try {
    const response = await fetch(
      'https://api.todos.in.jt-lab.ch/todos',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
}
