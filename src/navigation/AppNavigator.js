/* eslint-disable prettier/prettier */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const authStack = createStackNavigator(
  {
    SignIn: LoginScreen,
    SignUp: RegisterScreen,
    HomeScreen: HomeScreen,
  },
  {initialRouteName: 'SignIn', headerMode: 'none'},
);

const switchNavigator = createSwitchNavigator({
  authStack,
});

const AppNavigator = createAppContainer(switchNavigator);

export default AppNavigator;
