import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  comboBoxContainer: {
    position: 'relative',
    zIndex: 90,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  icon: {
    fontSize: 16,
    color: 'gray',
    marginRight: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    marginTop: '89%',
  },
  modalItem: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
