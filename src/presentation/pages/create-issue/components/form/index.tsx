import React from 'react';
import {View, Button, Text, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {api} from '../../../../../infra';
import {Styles} from './styles';
import {ComboBox, Input} from '../../../../components';
import {useApiContext} from '../../../../contexts';

type ResponseType = {
  id: number;
  email: string;
  name: string;
};

const formSchema = yup
  .object({
    title: yup
      .string()
      .min(6, 'O título deve ter no mínimo 6 caracteres')
      .required('Email é obrigatório'),
    description: yup.string().min(3, 'A descrição deve ter no mínimo 3 caracteres').required(),
    status: yup
      .string()
      .oneOf(['open', 'closed'], 'Status inválido')
      .required('Status é obrigatório'),
    city: yup
      .string()
      .min(3, 'A cidade deve possuir no mínimo 3 caracteres')
      .required('A cidade é obrigatória'),
    state: yup
      .string()
      .min(2, 'O estado deve possuir no mínimo 2 caracteres')
      .required('O estado é obrigatório'),
  })
  .required();

export const Form = () => {
  const {token} = useApiContext();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleGoToLogin = () => {
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post<ResponseType>('/issue', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      <Input label="Título" control={control} name="title" placeholder="Título" errors={errors} />
      <ComboBox
        control={control}
        name="status"
        label="Status"
        items={[
          {
            label: 'Aberto',
            value: 'open',
          },
          {
            label: 'Fechado',
            value: 'closed',
          },
        ]}
      />
      {errors.status && <Text style={Styles.errors}>{errors.status.message}</Text>}

      <Input
        label="Descrição"
        control={control}
        name="description"
        placeholder="Descrição"
        errors={errors}
      />
      <Input label="Estado" control={control} name="state" placeholder="Estado" errors={errors} />
      <Input label="Cidade" control={control} name="city" placeholder="Cidade" errors={errors} />
      <Button title="Registrar!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
