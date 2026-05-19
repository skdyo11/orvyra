
import { FirestorePermissionError } from './errors';

type ErrorEvents = {
  'permission-error': (error: FirestorePermissionError) => void;
};

class ErrorEmitter {
  private listeners: { [K in keyof ErrorEvents]?: ErrorEvents[K][] } = {};

  on<K extends keyof ErrorEvents>(event: K, callback: ErrorEvents[K]) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof ErrorEvents>(event: K, callback: ErrorEvents[K]) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(cb => cb !== callback);
  }

  emit<K extends keyof ErrorEvents>(event: K, error: FirestorePermissionError) {
    if (!this.listeners[event]) {
      // If no listener, we throw it as an uncaught exception for standard error overlays
      throw error;
    }
    this.listeners[event]!.forEach(callback => callback(error));
  }
}

export const errorEmitter = new ErrorEmitter();
