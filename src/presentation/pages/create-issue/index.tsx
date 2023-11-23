import React from 'react';
import {Text, View} from 'react-native';
import {Form} from './components';
import {Styles} from './styles';

export const CreateIssue: React.FC = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Novo problema</Text>
      <Form />
    </View>
  );
};
