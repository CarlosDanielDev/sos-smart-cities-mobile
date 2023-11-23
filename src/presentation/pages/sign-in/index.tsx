import React from 'react';
import {Button, Text, View} from 'react-native';

import {usePublicNavigation} from '../../hooks';
import {Form} from './components';
import {Styles} from './styles';

export function SignIn() {
  const navigate = usePublicNavigation();

  const handleRedirectToSignUp = (): void => {
    navigate.navigate('SignUp');
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>S.O.S Smart Cities</Text>
      <Form />

      <Button title="Cadastre-se aqui!" onPress={() => handleRedirectToSignUp()} />
    </View>
  );
}
