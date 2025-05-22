export function toggleTodoForm(show: boolean) {
  const form = document.querySelector(".todo-form-popup") as HTMLElement;

  if (!form) return;

  form.style.display = show ? "flex" : "none";
  form.style.opacity = show ? "1" : "0";
}
