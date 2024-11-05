import { create } from 'zustand';
import { Todo } from '@/types/trpc';

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: ({
    id,
    title,
    description,
  }: {
    id: number;
    title: string;
    description: string;
  }) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => {
  return {
    todos: [],

    setTodos: (todos) => set({ todos }),

    addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),

    updateTodo: ({ id, title, description }) =>
      set((state) => ({
        todos: state.todos?.map((todo) =>
          todo.id === id ? { ...todo, title, description } : todo
        ),
      })),

    deleteTodo: (id) =>
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  };
});
