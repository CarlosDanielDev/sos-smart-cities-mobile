import {useNavigation} from '@react-navigation/native';
import {AppRoutesType as IPublicRoutes} from '../../../main/router/public-routes';

export const usePublicNavigation = (): IPublicRoutes => {
  const publicNavigation = useNavigation<IPublicRoutes>();

  return publicNavigation;
};
