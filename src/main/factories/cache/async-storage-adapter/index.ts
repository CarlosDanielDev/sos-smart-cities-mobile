import {AsyncStorageAdapter} from '../../../../infra';

export const makeAsyncStorageAdapter = (): AsyncStorageAdapter => {
  return new AsyncStorageAdapter();
};
