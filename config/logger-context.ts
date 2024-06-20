import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from 'winston';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export const setLogger = (logger: Logger) => {
   asyncLocalStorage.getStore()?.set('logger', logger);
};

export const getLogger = (): Logger => {
   return asyncLocalStorage.getStore()?.get('logger');
};

export const runWithLogger = (logger: Logger, callback: () => void) => {
   const store = new Map();
   store.set('logger', logger);
   asyncLocalStorage.run(store, callback);
};
