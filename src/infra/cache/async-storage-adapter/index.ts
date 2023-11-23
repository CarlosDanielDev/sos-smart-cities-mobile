import {GetStorage, SetStorage} from '../../../data/protocols';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageAdapter implements SetStorage, GetStorage {
  async set(key: string, value: any): Promise<void> {
    if (value) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.removeItem(key);
    }
  }

  async get(key: string): Promise<any> {
    return await AsyncStorage.getItem(key);
  }
}
