import {makeAsyncStorageAdapter} from '../../../main/factories/cache';
import {UserInfo} from '../../../presentation/contexts';

export const setUserInfoAdapter = async (info: string): Promise<void> => {
  await makeAsyncStorageAdapter().set('userInfo', info);
};

export const getUserInfoAdapter = async (): Promise<UserInfo> => {
  const token = await makeAsyncStorageAdapter().get('userInfo');

  return JSON.parse(token) as UserInfo;
};
