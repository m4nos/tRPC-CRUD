import React, { useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';
import { trpc } from '@/trpc';
import { Todo } from '@/types/trpc';
import styles from './TodoCard.module.css';

export const TodoCard = ({ todo }: { todo: Todo }) => {
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { deleteTodo, updateTodo } = useTodoStore();

  const deleteMutation = trpc.todo.deleteTodo.useMutation();
  const updateMutation = trpc.todo.updateTodo.useMutation();
  const handleEditTodo = (
    todoId: number,
    currentTitle: string,
    currentDescription: string
  ) => {
    setEditingTodo(todoId);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
  };

  const handleSaveTodo = async (todoId: number) => {
    const updatedTodo = await updateMutation.mutateAsync({
      id: todoId,
      title: editTitle,
      description: editDescription,
    });
    updateTodo(updatedTodo); // Update the store
    setEditingTodo(null); // Exit edit mode
  };

  const handleCancelEdit = () => {
    setEditingTodo(null); // Exit edit mode
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteMutation.mutateAsync({ id });
    deleteTodo(id);
  };
  return editingTodo === todo.id ? (
    <div className={styles.todoContainer}>
      <input
        type="text"
        className={styles.inputField}
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="text"
        className={styles.inputField}
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
      />
      <div className={styles.optionsButtons}>
        <button
          className={styles.saveButton}
          onClick={() => handleSaveTodo(todo.id)}
        >
          Save
        </button>
        <button className={styles.cancelButton} onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.todoContainer}>
      <div>
        <span className={styles.todoTitle}>{todo.title}</span>
        <p className={styles.todoDescription}>{todo.description}</p>
      </div>
      <div className={styles.optionsButtons}>
        <button
          className={styles.editButton}
          onClick={() =>
            handleEditTodo(todo.id, todo.title, todo.description || '')
          }
        >
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>
        {/* <input type="checkbox" checked={!!todo.completed} onClick={() => {}} /> */}
      </div>
    </div>
  );
};
