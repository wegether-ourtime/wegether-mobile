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
import EventFormScreen from '../screens/EventFormScreen/EventFormScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import EventDetailScreen from '../screens/EventDetailScreen/EventDetailScreen';
import ChatListScreen from '../screens/ChatListScreen/ChatListScreen';
import LocationScreen from '../screens/LocationScreen/LocationScreen';
import FriendProfileScreen from '../screens/ProfileScreen/FriendProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import LivingPlaceScreen from '../screens/LocationScreen/LivingPlaceScreen';
import CodeScreen from '../screens/ScanScreen/CodeScreen';

export type StackParamList = {
  // DeleteProfileScreen: {
  //   navigation: StackNavigationHelpers;
  //   route: RouteProp<{params: {id: string}}, 'params'>;
  // };
  EventScreen: any;
  EventDetailScreen: any;
  MainScreen: any;
  ProfileScreen: any;
  EditProfileScreen: any;
  FriendProfileScreen: any;
  ScanScreen: any;
  EventFormScreen: any;
  ChatListScreen: any;
  ChatScreen: any;
  LocationScreen: any;
  LivingPlaceScreen: any;
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
      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
      {/* <Stack.Screen name="ScanScreen" component={ScanScreen} /> */}
      <Stack.Screen name="ScanScreen" component={CodeScreen} />
      <Stack.Screen name="EventFormScreen" component={EventFormScreen} />
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen
        name="FriendProfileScreen"
        component={FriendProfileScreen}
      />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="LivingPlaceScreen" component={LivingPlaceScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
