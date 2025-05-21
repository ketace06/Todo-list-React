export type Todo = {
    id: number;
    title: string;
    due_date?: string;
    content?: string;
};

export type NewTodo = {
    title: string;
    due_date?: string;
    content?: string;
};

export type Props = {
    todos: Todo[];
    onAddTodo: (todo: NewTodo) => Promise<void>;
    onDeleteTodo: (id: number) => Promise<void>;
    onEditTodo: (updatedTodo: Todo) => Promise<void>;
};