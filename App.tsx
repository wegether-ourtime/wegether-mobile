import React, {createContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigations/RootNavigation';
// import SplashScreen from 'react-native-splash-screen';
// import Toast from 'react-native-toast-message';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/sheets';
import {BackHandler} from 'react-native';
// import buddhaEra from 'dayjs/plugin/buddhistEra';
// import dayjs from 'dayjs';
import {AuthProvider} from './src/contexts/AuthContext';
import AppNavigator from './src/navigations/AppNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/config/toast-config';

type ActionContextType = {
  actiontaskId: string | null;
  setActiontaskId: React.Dispatch<React.SetStateAction<string | null>>;
};

const ActionContextState = {
  actiontaskId: '',
  setActiontaskId: () => {},
};

const ActionContext = createContext<ActionContextType>(ActionContextState);

const App = () => {
  const [actiontaskId, setActiontaskId] = useState<string | null>('');
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <>
      <ActionContext.Provider value={{actiontaskId, setActiontaskId}}>
        <NavigationContainer ref={navigationRef}>
          {/* <AuthProvider>
            <SheetProvider>
              <AppNavigator />
            </SheetProvider>
          </AuthProvider> */}
          <SheetProvider>
            <AppNavigator />
          </SheetProvider>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </ActionContext.Provider>
    </>
  );
};
export {ActionContext};
export default App;
