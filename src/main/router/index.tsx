import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PublicRoutes} from './public-routes';
import {PrivateRoutes} from './private-routes';
import {useApiContext} from '../../presentation/contexts';

export function Routes() {
  const {token} = useApiContext();

  return <NavigationContainer>{token ? <PrivateRoutes /> : <PublicRoutes />}</NavigationContainer>;
}
