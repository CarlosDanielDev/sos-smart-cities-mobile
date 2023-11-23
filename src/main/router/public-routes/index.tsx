import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {SignIn, SignUp} from '../../../presentation/pages';

import {View} from 'react-native';

export type IPublicRoutes = {
  Login: undefined;
  SignUp: undefined;
};

export type AppRoutesType = NativeStackNavigationProp<IPublicRoutes>;

const {Navigator, Screen} = createNativeStackNavigator<IPublicRoutes>();

export function PublicRoutes() {
  return (
    <View style={{backgroundColor: '#0f0f0f', flex: 1}}>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Login" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </View>
  );
}
