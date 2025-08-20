'use client';
import { Amplify } from 'aws-amplify';
import { amplifyConfig as config } from '@/config/amplify';

Amplify.configure(config);

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}