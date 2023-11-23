import React from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {api} from '../../../../../infra';
import {Styles} from './styles';
import {usePublicNavigation} from '../../../../hooks';

type ResponseType = {
  id: number;
  email: string;
  name: string;
};

const formSchema = yup
  .object({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    name: yup
      .string()
      .min(3, 'O nome deve possuir no mínimo 3 caracteres')
      .required('O nome é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'A senha deve conter pelo menos um caractere maiúsculo, um minúsculo, um número e um símbolo especial',
      )
      .required('Senha é obrigatória'),
  })
  .required();

export const Form = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  const navigation = usePublicNavigation();

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post<ResponseType>('/register', data);
      Alert.alert('Sucesso', 'Você será encaminhado para a tela de Login!', undefined, {
        onDismiss: () => console.log('dismiss'),
      });

      if (response.data.id) {
        handleGoToLogin();
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar dados');
    }
  };

  return (
    <View style={Styles.constainer}>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text>Nome:</Text>
            <TextInput
              style={Styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Nome"
            />
          </>
        )}
      />

      {errors.name && <Text style={Styles.errors}>{errors.name.message}</Text>}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text>E-mail:</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              style={Styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
            />
          </>
        )}
      />
      {errors.email && <Text style={Styles.errors}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <Text>Senha:</Text>
            <TextInput
              style={Styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Senha"
              secureTextEntry
            />
          </>
        )}
      />
      {errors.password && <Text style={Styles.errors}>{errors.password.message}</Text>}

      <Button title="Registrar!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
