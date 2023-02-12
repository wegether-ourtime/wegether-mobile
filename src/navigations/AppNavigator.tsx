import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppAuthNavigator from './AppAuthNavigator';
import MainNavigator from './MainNavigator';
import LoadingNavigator from './LoadingNavigator';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="initPage"
        component={LoadingNavigator}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="Auth" component={AppAuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
