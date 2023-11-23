import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    top: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
