import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

import {Issues, Profile, CreateIssue} from '../../../presentation/pages';
import {Text} from 'react-native';

export type IPrivateRoutes = {
  Issues: undefined;
  CreateIssue: undefined;
  Profile: undefined;
};

const {Navigator, Screen} = createBottomTabNavigator<IPrivateRoutes>();

export function PrivateRoutes() {
  return (
    <Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';
          if (route.name === 'Issues') {
            iconName = 'home';
          }
          if (route.name === 'CreateIssue') {
            iconName = 'alert-triangle';
          }
          if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => {
          if (route.name === 'Issues') return <Text>Home</Text>;
          if (route.name === 'CreateIssue') return <Text>Registrar problema</Text>;
          if (route.name === 'Profile') return <Text>Meu perfil</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      initialRouteName="Issues">
      <Screen name="Issues" component={Issues} />
      <Screen name="CreateIssue" component={CreateIssue} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
