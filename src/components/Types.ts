export type Todo = {
  id: number;
  title: string;
  due_date?: string;
  content?: string;
  done?: boolean;
  category?: Category | null;
  category_id?: string | null;
};

export type NewTodo = {
  id?: number;
  title?: string;
  due_date?: string | null;
  content?: string | null;
  done?: boolean;
};

export type Props = {
  todos: Todo[];
  onAddTodo: (todo: Omit<NewTodo, "id">) => Promise<NewTodo>;
  onDeleteTodo: (id: number) => Promise<void>;
  onEditTodo: (updatedTodo: NewTodo, categoryId?: string | null) => void;
};

export type Category = {
  id: string;
  title: string;
  color: string;
};

export type CategoryInsert = {
  id: string;
  title: string;
  color: string;
};
