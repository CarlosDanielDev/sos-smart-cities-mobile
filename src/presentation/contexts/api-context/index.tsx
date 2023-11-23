import {
  getCurrentTokenAdapter,
  setCurrentTokenAdapter,
  setUserInfoAdapter,
} from '../../../main/adapters';

import {makePubSubEventAdapter} from '../../../main/factories';

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

export type UserInfo = {
  name: string;
  email: string;
};

type Props = {
  setCurrentToken?: (token: string) => Promise<void>;
  getCurrentToken?: () => Promise<string>;
  bootstrapAsync: () => Promise<void>;
  token?: string;
  updateUser: (user: UserInfo) => Promise<void>;
  user?: UserInfo;
};

const ApiContext = createContext<Props>({} as Props);

type ApiContextProviderProps = {
  children: React.ReactNode;
};

const USER_DEFAULT_INFO = {
  name: '',
  email: '',
};

export const ApiContextProvider: React.FC<ApiContextProviderProps> = ({children}) => {
  const [token, setToken] = useState<string>('');

  const [user, setUser] = useState<UserInfo>(USER_DEFAULT_INFO);

  const updateUser = async (userInfo: UserInfo) => {
    setUser(userInfo);
    await setUserInfoAdapter(JSON.stringify(userInfo));
  };

  const bootstrapAsync = async () => {
    try {
      const currentToken = await getCurrentTokenAdapter();
      if (currentToken) {
        setToken(currentToken);
      }
    } catch {
      setToken('');
    }
  };

  const invalidateAccess = useCallback(() => {
    setToken('');
    setCurrentTokenAdapter('');
    setUser(USER_DEFAULT_INFO);
    setUserInfoAdapter('');
  }, []);

  useEffect(() => {
    makePubSubEventAdapter.subscribe({
      event: 'payment-required',
      fn: () => {
        invalidateAccess();
      },
    });
    makePubSubEventAdapter.subscribe({
      event: 'invalid-refresh-token',
      fn: () => {
        invalidateAccess();
      },
    });
    bootstrapAsync();
  }, [makePubSubEventAdapter]);

  const value = useMemo(
    () => ({
      token,
      bootstrapAsync,
      setCurrentToken: setCurrentTokenAdapter,
      getCurrentToken: getCurrentTokenAdapter,
      updateUser,
      user,
    }),
    [token, bootstrapAsync, setCurrentTokenAdapter, getCurrentTokenAdapter, user, updateUser],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApiContext should be used with an ApiContextProvider');
  }

  return context;
};
