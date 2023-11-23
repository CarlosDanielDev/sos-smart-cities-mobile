import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Styles} from './styles';

export type IIssue = {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'closed';
  city: string;
  state: string;
  authorId: number;
};

export const Issue: React.FC<{issue: IIssue}> = ({issue}) => {
  const [expanded, setExpanded] = useState(false);

  const iconSelected = {
    closed: <Feather size={20} name="check-square" />,
    open: <Feather size={20} name="square" />,
  };

  return (
    <TouchableOpacity style={Styles.card} onPress={() => setExpanded(!expanded)}>
      <View style={Styles.cardHeader}>
        <Text style={Styles.cardTitle}>{issue.title}</Text>
        {iconSelected[issue.status]}
      </View>
      {expanded && (
        <View style={Styles.cardContent}>
          <Text>{issue.description}</Text>
          <Text>Cidade: {issue.city}</Text>
          <Text>UF: {issue.state}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
