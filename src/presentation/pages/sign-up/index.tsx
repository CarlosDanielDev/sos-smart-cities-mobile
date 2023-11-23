import {Button, Text, View} from 'react-native';
import {usePublicNavigation} from '../../hooks';
import {Form} from './components';
import {Styles} from './styles';

export const SignUp: React.FC = () => {
  const naviagtion = usePublicNavigation();

  const handleGoBack = (): void => {
    if (naviagtion.canGoBack()) {
      naviagtion.goBack();
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.goBackButton}>
        <Button title="Voltar" onPress={handleGoBack} />
      </View>
      <Text style={Styles.title}>Novo cadastro!</Text>
      <Form />
    </View>
  );
};
