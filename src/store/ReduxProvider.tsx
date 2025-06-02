'use client';

import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useRef } from 'react';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
