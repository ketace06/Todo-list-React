export function toggleTodoForm(show: boolean) {
  const form = document.querySelector(".todo-form-popup") as HTMLElement;
  if (!form) return;

  if (show) {
    form.classList.remove("hide");
    form.style.display = "flex";
    setTimeout(() => {
      form.style.opacity = "1";
    }, 10);
  } else {
    form.classList.add("hide");
    form.style.opacity = "0";
    setTimeout(() => {
      form.style.display = "none";
      form.classList.remove("hide");
    }, 200);
  }
}
