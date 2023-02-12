import React, {createContext, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
// import LoginScreen from '../screens/LoginScreen/LoginScreen';
// import PinScreen from '../screens/PinScreen/PinScreen';
// import OtpScreen from '../screens/OtpScreen/OtpScreen';
// import MainTapNavigator from './bottomTabs/MainTapNavigator';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import TaskDetailScreen from '../screens/TaskDetailScreen.tsx/TaskDetailScreen';

// import ProfileDocument from '../screens/ProfileScreen/ProfileDocument';
// import FourthFormScreen from '../screens/RegisterScreen/FourthFormScreen';
// import AddIDcardScreen from '../screens/RegisterScreen/AddIDcardScreen';
// import ViewProfile from '../screens/ProfileScreen/ViewProfile';
// import EditProfile from '../screens/ProfileScreen/EditProfile';
// import DeleteProfile from '../screens/ProfileScreen/DeleteProfile';
// import VerifyOTP from '../screens/ProfileScreen/DeleteProfile/VerifyOTP';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import MainTapNavigator from './bottomTabs/MainTapNavigator';
import EventScreen from '../screens/EventScreen/EventScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import InterestScreen from '../screens/InterestScreen/InterestScreen';
// import NotificationList from '../screens/ProfileScreen/NotificationList';
// import DeleteSuccess from '../screens/ProfileScreen/DeleteProfile/DeleteSuccess';

export type StackParamList = {
  // DeleteProfileScreen: {
  //   navigation: StackNavigationHelpers;
  //   route: RouteProp<{params: {id: string}}, 'params'>;
  // };
  InterestScreen: any;
  EventScreen: any;
  MainScreen: any;
  ProfileScreen: any;
  // DeleteSuccess: {
  //   navigation: StackNavigationHelpers;
  // };
};
export type StackNativeScreenProps<T extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, T>;
const Stack = createStackNavigator<StackParamList>();
const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainScreen"
        component={MainTapNavigator}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
