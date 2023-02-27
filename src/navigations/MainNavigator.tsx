import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import MainTapNavigator from './bottomTabs/MainTapNavigator';
import EventScreen from '../screens/EventScreen/EventScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ScanScreen from '../screens/ScanScreen/ScanScreen';
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';

export type StackParamList = {
  // DeleteProfileScreen: {
  //   navigation: StackNavigationHelpers;
  //   route: RouteProp<{params: {id: string}}, 'params'>;
  // };
  EventScreen: any;
  MainScreen: any;
  ProfileScreen: any;
  ScanScreen: any;
  CreateEventScreen: any;
  ChatScreen: any;
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
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
