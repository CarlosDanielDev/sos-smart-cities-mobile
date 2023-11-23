import React from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {api} from '../../../../../infra';
import {Styles} from './styles';
import {useApiContext} from '../../../../contexts/api-context';

type ResponseType = {
  access_token: string;
  user: {
    sub: number;
    email: string;
    name: string;
  };
};

const formSchema = yup
  .object({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  })
  .required();

export const Form = () => {
  const {setCurrentToken, bootstrapAsync, updateUser} = useApiContext();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post<ResponseType>('/login', data);

      Alert.alert('Sucesso', 'Dados enviados com sucesso');

      if (setCurrentToken) {
        await setCurrentToken(response.data.access_token);

        const user = {
          name: response.data.user.name,
          email: response.data.user.email,
        };

        await updateUser(user);

        await bootstrapAsync();
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar dados');
    }
  };

  return (
    <View style={Styles.constainer}>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={Styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            placeholder="Email"
          />
        )}
      />
      {errors.email && <Text style={Styles.errors}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={Styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Senha"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={Styles.errors}>{errors.password.message}</Text>}

      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
