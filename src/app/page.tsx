import { revalidatePath } from 'next/cache';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '@/models';



async function createTodo(formData: FormData) {
  'use server';
  const name = formData.get('name')?.toString() ?? '';
  await DataStore.save(new Todo({ name }));
  revalidatePath('/');
}

export default async function Home() {
  const todos = await DataStore.query(Todo);

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