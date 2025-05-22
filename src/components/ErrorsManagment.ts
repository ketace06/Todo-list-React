export function errorsManagment(
  title: string,
  date: string,
  content: string,
): string | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date) {
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      return "Warning: Due date cannot be before today.";
    }
  }
  if (title.trim().length > 50) {
    return "Warning: Title must be less than 50 characters.";
  }
  if (content.trim().length > 200) {
    return "Warning: Description must be less than 200 characters";
  }
  return null;
}
