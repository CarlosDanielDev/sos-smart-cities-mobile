import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Control, useController} from 'react-hook-form';
import {Styles} from './styles';

type Item = {
  label: string;
  value: string;
};

interface ComboBoxProps {
  control: Control<any>;
  name: string;
  label?: string;
  items: Item[];
}

export const ComboBox: React.FC<ComboBoxProps> = ({name, items, control, label}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {field} = useController({control, name});

  const selectItem = (value: string) => {
    field.onChange(value);
    setModalVisible(false);
  };

  return (
    <>
      {label && <Text>{label}:</Text>}
      <View style={Styles.comboBoxContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={Styles.picker}>
          <Text>
            {field.value ? items.find(item => item.value === field.value)?.label : 'Select...'}
          </Text>
          <Icon name="chevron-down" style={Styles.icon} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={Styles.modalView}>
            <FlatList
              data={items}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => selectItem(item.value)}>
                  <Text style={Styles.modalItem}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </>
  );
};
