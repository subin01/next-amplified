'use server';
import { revalidatePath } from 'next/cache';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '@/models';
import { Amplify } from 'aws-amplify';
import { amplifyConfig as config } from '@/config/amplify';

Amplify.configure(config, { ssr: true });

export async function createTodo(formData: FormData) {
  const name = formData.get('name')?.toString() ?? '';
  await DataStore.save(new Todo({ name }));
  revalidatePath('/');
}