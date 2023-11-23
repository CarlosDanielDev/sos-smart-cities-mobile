import {Alert, Button, Text, View} from 'react-native';
import {useApiContext} from '../../contexts';
import Icon from 'react-native-vector-icons/Feather';
import {Styles} from './styles';

export const Profile: React.FC = () => {
  const {user, invalidateAccess, bootstrapAsync} = useApiContext();

  const handleConfirm = async () => {
    await invalidateAccess();
    await bootstrapAsync();
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Você está saindo...',
      'Você tem certeza que quer fazer isso?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'default',
        },
        {
          text: 'Confirmar',
          onPress: handleConfirm,
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Icon name="user" size={132} color="#000" />
        <Text style={Styles.greeting}>Olá, {user?.name}!</Text>
      </View>

      <View>
        <Text style={Styles.subInfo}>nome:</Text>
        <View style={Styles.infoWrapper}>
          <Text style={Styles.subInfo}>{user?.name}</Text>
        </View>

        <Text style={Styles.subInfo}>e-mail:</Text>
        <View style={Styles.infoWrapper}>
          <Text style={Styles.subInfo}>{user?.email}</Text>
        </View>
      </View>

      <Button title="Sair" onPress={showConfirmDialog} />
    </View>
  );
};
