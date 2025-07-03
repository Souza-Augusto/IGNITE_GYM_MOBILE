import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Login } from '@screens/login/view';
import { Register } from '@screens/register/view';

type AuthRoutes = {
  login: undefined;
  register: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='login' component={Login} />

      <Screen name='register' component={Register} />
    </Navigator>
  );
}
