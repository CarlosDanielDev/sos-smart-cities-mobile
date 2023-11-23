import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoWrapper: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    padding: 12,
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  subInfo: {
    fontSize: 16,
    color: '#000',
  },
});
