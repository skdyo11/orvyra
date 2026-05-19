
'use client';

import React, { useMemo } from 'react';
import { getFirebaseApp, getFirestoreInstance, getAuthInstance } from './config';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const { app, firestore, auth } = useMemo(() => {
    const app = getFirebaseApp();
    const firestore = getFirestoreInstance(app);
    const auth = getAuthInstance(app);
    return { app, firestore, auth };
  }, []);

  return (
    <FirebaseProvider app={app} firestore={firestore} auth={auth}>
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
