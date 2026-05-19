
'use client';

export * from './provider';
export * from './client-provider';
export * from './config';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
export * from './error-emitter';
export * from './errors';

import { useMemo } from 'react';
import { Query, DocumentReference } from 'firebase/firestore';

export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  return useMemo(factory, deps);
}
