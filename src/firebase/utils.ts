'use client';

import { useMemo, useRef } from 'react';

/**
 * A specialized memoization hook for Firebase references and queries.
 * It ensures that the reference/query is only recreated when the dependencies change,
 * which is critical for preventing infinite loops in useCollection and useDoc.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<T>(null);
  const depsRef = useRef<any[]>(null);

  const depsChanged = !depsRef.current || deps.some((dep, i) => dep !== depsRef.current![i]);

  if (depsChanged) {
    ref.current = factory();
    depsRef.current = deps;
  }

  return ref.current!;
}
