import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {api} from '../../../infra';
import {useApiContext} from '../../contexts';
import {Issue, IIssue} from './components/issue';
import {Styles} from './styles';

export const Issues: React.FC = () => {
  const {token, user} = useApiContext();
  const [issues, setIssues] = useState<IIssue[]>([]);

  const fetchIssues = async () => {
    try {
      const response = await api.get('/issue', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIssues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchIssues();
    }, []),
  );

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <View style={Styles.header}>
            <Text style={Styles.titleHeader}>Olá, {user?.name}</Text>
            <Text>bem vindo de volta, abaixo estão os últimos problemas cadastrados</Text>
          </View>
        }
        data={issues.reverse()}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Issue issue={item} />}
      />
    </SafeAreaView>
  );
};
