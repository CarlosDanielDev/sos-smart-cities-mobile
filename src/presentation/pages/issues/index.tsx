import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {api} from '../../../infra';
import {useApiContext} from '../../contexts';
import {Issue, IIssue} from './components/issue';

export const Issues: React.FC = () => {
  const {token} = useApiContext();
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
        data={issues}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Issue issue={item} />}
      />
    </SafeAreaView>
  );
};
