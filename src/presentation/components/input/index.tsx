import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Control, Controller, FieldError, FieldValues, Path} from 'react-hook-form';
import {Styles} from './styles';

interface TextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  style?: object;
  errors: {
    [key in Path<TFieldValues>]?: FieldError;
  };
}

export const Input = <TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  style,
  errors,
  label,
}: TextFieldProps<TFieldValues>) => {
  return (
    <View style={Styles.container}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            {label && <Text>{label}:</Text>}

            <TextInput
              style={[Styles.input, style]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
            {errors[name] && <Text style={Styles.errors}>{errors[name]?.message}</Text>}
          </>
        )}
      />
    </View>
  );
};
