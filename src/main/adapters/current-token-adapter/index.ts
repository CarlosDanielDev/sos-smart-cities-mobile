import {makeAsyncStorageAdapter} from '../../../main/factories/cache';

export const setCurrentTokenAdapter = async (token: string): Promise<void> => {
  await makeAsyncStorageAdapter().set('accessToken', token);
};

export const getCurrentTokenAdapter = async (): Promise<string> => {
  const token = await makeAsyncStorageAdapter().get('accessToken');

  return JSON.parse(token);
};
