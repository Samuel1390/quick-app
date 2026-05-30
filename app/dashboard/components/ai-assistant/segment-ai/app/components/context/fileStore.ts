import { useSyncExternalStore } from 'react';

type Listener = () => void;
let viewingFile: File | null = null;
const listeners = new Set<Listener>();

export const fileStore = {
  getFile: () => viewingFile,
  setFile: (file: File | null) => {
    viewingFile = file;
    listeners.forEach((l) => l());
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useFileStore() {
  return useSyncExternalStore(
    fileStore.subscribe,
    fileStore.getFile,
    fileStore.getFile
  );
}
