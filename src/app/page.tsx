'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';
import { trpc } from '@/trpc';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { todos, setTodos, addTodo, deleteTodo } = useTodoStore();
  const { data: fetchedTodos, isSuccess: isFetchTodosSuccess } =
    trpc.todo.getTodos.useQuery();

  const createMutation = trpc.todo.createTodo.useMutation();
  const deleteMutation = trpc.todo.deleteTodo.useMutation();
  // const updateMutation = trpc.todo.updateTodo.useMutation();

  useEffect(() => {
    if (isFetchTodosSuccess) setTodos(fetchedTodos);
  }, [fetchedTodos, isFetchTodosSuccess, setTodos]);

  const handleAddTodo = async () => {
    const newTodo = await createMutation.mutateAsync({ title, description });
    addTodo(newTodo);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteMutation.mutateAsync({ id });
    deleteTodo(id);
  };

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        <h1>Todo List</h1>

        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>

        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <div>
                <span>{todo.title}</span>
                <p>{todo.description}</p>
              </div>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
