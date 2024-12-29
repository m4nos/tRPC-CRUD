'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';
import { trpc } from '@/trpc';
import { TodoCard } from './components/TodoCard';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { todos, setTodos, addTodo } = useTodoStore();

  const { data: fetchedTodos, isSuccess: isFetchTodosSuccess } =
    trpc.todo.getTodos.useQuery();

  const createMutation = trpc.todo.createTodo.useMutation();

  useEffect(() => {
    if (isFetchTodosSuccess) setTodos(fetchedTodos);
  }, [fetchedTodos, isFetchTodosSuccess, setTodos]);

  const handleAddTodo = async () => {
    if (title.trim()) {
      const newTodo = await createMutation.mutateAsync({ title, description });
      addTodo(newTodo);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        <h1 className={styles.heading}>Todo List</h1>

        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={styles.addButton} onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>

        <ul className={styles.todoList}>
          {todos?.map((todo) => (
            <li className={styles.todoItem} key={todo.id}>
              <TodoCard todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
