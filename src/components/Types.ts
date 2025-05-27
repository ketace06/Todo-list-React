export type Todo = {
  id: number;
  title: string;
  due_date?: string;
  content?: string;
  done?: boolean;
  category_id?: string;
  category?: Category;
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
  onAddTodo: (todo: NewTodo) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
  onEditTodo: (updatedTodo: NewTodo, category_id?: string) => void;
};

export type Category = {
  id: string;
  title: string;
  color: string;
};

export type CategoryInsert = {
  title: string;
  color: string;
};
