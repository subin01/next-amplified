'use client';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '@/models';
import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    DataStore.query(Todo).then(setTodos);
  }, []);

  const createTodo = async (formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    await DataStore.save(new Todo({ name }));
    const updatedTodos = await DataStore.query(Todo);
    setTodos(updatedTodos);
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '100px'
      }}
    >
      <form action={createTodo}>
        <input name="name" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>

      {(!todos || todos.length === 0) && (
        <div>
          <p>No todos, please add one.</p>
        </div>
      )}

      {/* 4. Display todos*/}
      <ul>
        {todos.map((todo, i) => {
          return <li key={i}>{todo.name}</li>;
        })}
      </ul>
    </div>
  );
}