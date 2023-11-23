import {Suspense} from 'react';
import {Routes} from './router';
import {View} from 'react-native';
import {ApiContextProvider} from '../presentation/contexts';

// import { AccountProvider, ApiContextProvider } from '@/presentation/contexts';

export function Main() {
  return (
    <Suspense fallback={<View />}>
      <ApiContextProvider>
        {/* <AccountProvider> */}
        {/* <ComingSoonModal /> */}
        <Routes />
        {/* </AccountProvider> */}
      </ApiContextProvider>
    </Suspense>
  );
}
